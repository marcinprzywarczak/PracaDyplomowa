<?php

namespace App\Http\Controllers;

use App\Http\Requests\Offers\EditOfferRequest;
use App\Http\Requests\Offers\OfferRequest;
use App\Models\Offer;
use App\Models\OfferStatus;
use App\Models\OfferType;
use App\Models\Photo;
use App\Models\PropertyType;
use App\Models\User;
use App\Repositories\OfferRepository;
use Exception;
use Faker\Core\Number;
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

    public function getOffer(Request $request, OfferRepository $repository) {
        return $repository->getOffer($request);
    }

    public function getOfferToEdit(Request $request, OfferRepository $repository) {
        $offer = Offer::findOrFail($request->id);
        $this->authorize('update', $offer);

        return $repository->getOffer($request);
    }

    public function store(OfferRequest $request, OfferRepository $repository) {
        return $repository->storeOffer($request);
    }

    public function getUserOffers(Request $request, OfferRepository $repository) {
        return $repository->getUserOffers($request);
    }

    public function getFollowOffers(Request $request , OfferRepository $repository) {
        return $repository->getFollowOffers();

    }


    public function addOfferToFollowing(Request $request, OfferRepository $offerRepository) {
        return $offerRepository->addOfferToFollowing($request);
    }

    public function removeOfferFromFollowing(Request $request, OfferRepository $offerRepository){
        return $offerRepository->removeOfferFromFollwoing($request);
    }

    public function update(EditOfferRequest $request, OfferRepository $repository) {
        $offer = Offer::findOrFail($request->input('offer_id'));

        $this->authorize('update', $offer);
        return $repository->updateOffer($request);
    }

    public function completeOffer(Request $request, OfferRepository $repository)
    {
        $offer = Offer::findOrFail($request->input('offerId'));
        $this->authorize('completeOffer', $offer);
        return $repository->completeOffer($request);
    }

    public function restoreOffer(Request $request, OfferRepository $repository)
    {
        $offer = Offer::findOrFail($request->input('offerId'));
        $this->authorize('restoreOffer', $offer);
        return $repository->restoreOffer($request);
    }

}
