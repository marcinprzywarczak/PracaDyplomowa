<?php

namespace App\Repositories;

use App\Models\Offer;
use Illuminate\Database\Eloquent\Builder;

class OfferRepository
{
    public function offerFilter($filters, $parameterFilters, $parameterIn, $parameterValueIn){
        $offers = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status', 'parameters')
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
//        dd($offers);
        return $offers->paginate(10);
    }
}
