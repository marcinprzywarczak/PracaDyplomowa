<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function index(Request $request){

        $offers = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status', 'parameters')
            ->where($request->filters);
        if($request->parameterFilters !== null)
        foreach ($request->parameterFilters as $parameter){
            $offers = $offers->whereHas('parameters', function (Builder $query) use ($parameter) {
                $query->where([['name', 'like', $parameter['column']],
                    ['value', $parameter['operator'], $parameter['value']]]);
            });
        }
        if($request->parameterIn !== null)
        foreach ($request->parameterIn as $parameter){
            $offers = $offers->whereHas('parameters', function (Builder $query) use ($parameter) {
                $query->where($parameter['column'],$parameter['operator'], $parameter['value']);
            });
        }
        $offers = $offers->paginate(10);
        return response()->json(['offers' => $offers]);
    }
}
