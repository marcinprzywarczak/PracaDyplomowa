<?php

namespace App\Http\Controllers;

use App\Models\PropertyType;
use Illuminate\Http\Request;

class PropertyTypeController extends Controller
{
    public function getPropertyType(){
        $propertyType = PropertyType::all();
        return response()->json($propertyType);
    }
}
