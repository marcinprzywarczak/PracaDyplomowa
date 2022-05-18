<?php

namespace App\Http\Controllers;

use App\Models\OfferType;
use Illuminate\Http\Request;

class OfferTypeController extends Controller
{
    public function getOfferType(){
        $offerType = OfferType::all();
        return response()->json($offerType);
    }
}
