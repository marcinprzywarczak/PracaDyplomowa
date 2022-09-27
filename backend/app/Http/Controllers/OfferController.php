<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfferRequest;
use App\Models\Offer;
use App\Models\OfferStatus;
use App\Models\OfferType;
use App\Models\ParameterCategory;
use App\Models\Photo;
use App\Models\PropertyType;
use App\Models\User;
use App\Repositories\OfferRepository;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OfferController extends Controller
{
    public function index(Request $request, OfferRepository $repository){

        $offers = $repository->offerFilter($request->filters,
            $request->parameterFilters,
            $request->parameterIn,
            $request->parameterValueIn);
        return response()->json(['offers' => $offers]);
    }

    public function getOfferAndPropertyTypes(){
        $propertyTypes = PropertyType::all();
        $offerTypes = OfferType::all();
        return response()->json(['propertyTypes' => $propertyTypes, 'offerTypes' => $offerTypes]);
    }

    public function getOffer(Request $request){
        try {
            $offer = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status', 'parameters', 'photos')
                ->where('id', $request->id)->first();
            $parameter_category = ParameterCategory::
            whereHas('parameters.offers', function (Builder $query) use($request){
                $query->where('offers.id', $request->id);
            })->get();
//        with('parameters', 'parameters.offers')->get();
            if($offer === null){
                return response()->json([
                    'error' => 'Nie znaleziono oferty o podanym id'
                ], 404);
            }
            return response()->json(
                [
                    'offer' => $offer,
                    'parameterCategories' => $parameter_category
                ]
            );
        } catch (Exception $error){
            return response()->json([
                'error' => $error
            ], 404);
        }

    }

    public function store(OfferRequest $request) {
        try{
            $photoPaths = [];
            if($request->hasFile('files')) {
                $files = $request->file('files');
                foreach ($files as $file) {
                    if($file->isValid()){
                        $photo = $file->store('offers');
                        if(!is_string($photo)){
                            return response()->json([
                                'error' => 'Błąd podczas zapisywania zdjęcia'
                            ], 400);
                        }
                        $photoPaths[] = $photo;
                    }
                }
            }
            $mainPhotoSrc = '';
            if($request->hasFile('main_photo') && $request->file('main_photo')->isValid()) {
                $mainPhoto = $request->file('main_photo');
                $mainPhotoSrc = $mainPhoto->store('offers');
                if(!is_string($mainPhotoSrc)){
                    return response()->json([
                        'error' => 'Błąd podczas zapisywania zdjęcia'
                    ], 400);
                }
            }

            $offerStatuses = OfferStatus::where('name', 'aktywna')->first();
            DB::transaction(function () use ($request, $offerStatuses, $photoPaths, $mainPhotoSrc){
                $offer = Offer::create(
                    $request->merge(array(
                        'user_id' => Auth::id(),
                        'offer_status_id' => $offerStatuses->id))->all()
                );
                $parameters = $request->get('parameters');
                foreach ($parameters as $parameter){
                    $parameterValue = $parameter["value"] === null ? '' : $parameter["value"];
                    $offer->parameters()->attach(
                        $parameter["parameterId"],
                        [
                            'value' => $parameterValue,
                        ]
                    );
                }
                foreach ($photoPaths as $photo) {
                     $photoModel = Photo::create([
                        "path" => asset($photo),
                        "description" => ''
                    ]);
                    $offer->photos()->attach($photoModel->id,
                    [
                        'isMain' => 0,
                    ]);
                }
                $mainPhoto = Photo::create([
                    "path" => asset($mainPhotoSrc),
                    "description" => ''
                ]);
                $offer->photos()->attach($mainPhoto->id,
                [
                    'isMain' => 1,
                ]);
            });

            return response()->json([], 200);

        } catch (Exception $error){
            foreach ($photoPaths as $photo) {
                if(is_string($photo)){
                    Storage::delete($photo);
                }
            }
            if(is_string($mainPhotoSrc)){
                Storage::delete($mainPhotoSrc);
            }
            return response()->json([
                'error' => $error
            ], 400);
        }
    }

    public function getUserOffers(Request $request) {
        $offerStatusName = $request->get('status');
        $offerStatus = OfferStatus::where('name', $offerStatusName)->first();
        if ($offerStatus === null) {
            return response()->json([
                'error' => 'Błąd. Podany status ogłoszenia nie istnieje'
            ], 400);
        }
        $user = User::with('firm')->where('id', Auth::id())->first();

        $offers = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status',
            'parameters', 'photos')
            ->where([['user_id', Auth::id()], ['offer_status_id', $offerStatus->id]])->paginate(10);

        if($user->firm !== null) {
            $offers = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status',
                'parameters', 'photos')
                ->where('offer_status_id', $offerStatus->id)
                ->whereHas('user.firm', function (Builder $query) use ($user) {
                    $query->where('id', '=', $user->firm->id);
                })->orderBy('id', 'ASC')
                ->paginate(10);
        }

        return response()->json([
            'offers' => $offers
        ], 200);
    }

    public function getFollowOffers(Request $request) {
        $offers = Offer::with('users', 'user','user.firm', 'property_type', 'offer_type', 'offer_status',
            'parameters', 'photos')->whereHas('users', function (Builder $query) {
            $query->where('user_id', '=', Auth::id());
        })->paginate(10);

        return response()->json([
            'offers' => $offers
        ], 200);
    }


    public function addOfferToFollowing(Request $request) {
        $offerId = $request->get('offerId');
        $offer = Offer::with('users')->where('id', $offerId)->first();

        if($offer === null) {
            return response()->json([
                'error' => 'Podane ogłoszenie nie istnieje!'
            ], 400);
        }
        if($offer->user_id === Auth::id()) {
            return response()->json([
                'error' => 'Nie możesz obserwować ogłoszenia, którego jesteś autorem.'
            ], 400);
        }
        if($offer->users->find(Auth::id()) !== null) {
            return response()->json([
                'error' => 'Ogłoszenie znajduje się już w twoich obserwowanych ogłoszeniach.'
            ], 400);
        }
        $offer->users()->attach(
            Auth::id()
        );
        return response()->json([
            'message' => 'Ogłoszenie pomyślnie dodane do obserwowanych.'
        ], 200);
    }

}
