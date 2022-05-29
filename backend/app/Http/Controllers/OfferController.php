<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\OfferType;
use App\Models\ParameterCategory;
use App\Models\PropertyType;
use App\Repositories\OfferRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $offer = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status', 'parameters')
            ->where('id', $request->id)->first();
        $parameter_category = ParameterCategory::
            whereHas('parameters.offers', function (Builder $query) use($request){
            $query->where('offers.id', $request->id);
        })->get();
//        with('parameters', 'parameters.offers')->get();

        return response()->json(
            [
                'offer' => $offer,
                'parameterCategories' => $parameter_category
            ]
        );
    }
}
