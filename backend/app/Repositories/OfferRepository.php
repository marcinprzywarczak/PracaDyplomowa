<?php

namespace App\Repositories;

use App\Models\Offer;
use App\Models\ParameterCategory;
use Exception;
use Illuminate\Database\Eloquent\Builder;

class OfferRepository
{
    public function offerFilter($filters, $parameterFilters, $parameterIn, $parameterValueIn){
        $offers = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status', 'parameters', 'photos')
            ->where($filters !== null ? $filters : []);
        if($parameterFilters !== null)
            foreach ($parameterFilters as $parameter){
                $offers = $offers->whereHas('parameters', function (Builder $query) use ($parameter) {
                    $query->where([['name', 'like', $parameter['column']],
                        ['value', $parameter['operator'], $parameter['value']]]);
                });
            }
        if($parameterIn !== null)
            foreach ($parameterIn as $parameter){
                $offers = $offers->whereHas('parameters', function (Builder $query) use ($parameter) {
                    $query->where($parameter['column'],$parameter['operator'], $parameter['value']);
                });
            }

        if($parameterValueIn !== null)
            foreach ($parameterValueIn as $parameter){
                $offers = $offers->whereHas('parameters', function (Builder $query) use ($parameter) {
                    $query->where('name', 'like', $parameter['column'])
                        ->whereIn('value', $parameter['value']);
                });
            }
        return $offers->paginate(10);
    }

    public function getOffer($request) {
        try {
            $offer = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status', 'parameters', 'photos')
                ->findOrFail($request->id);
            $parameter_category = ParameterCategory::
            whereHas('parameters.offers', function (Builder $query) use($request){
                $query->where('offers.id', $request->id);
            })->get();
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
}
