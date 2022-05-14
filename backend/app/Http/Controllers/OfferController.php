<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function index(){
        $offers = Offer::with('user','user.firm', 'property_type', 'offer_type', 'offer_status')
            ->paginate(10);
        //dd($offers);
        return response()->json(['offers' => $offers]);
    }
}
