<?php

namespace App\Http\Controllers;

use App\Models\Parameter;
use Illuminate\Http\Request;

class ParameterController extends Controller
{
    public function index(Request $request){
        $parameters = Parameter::with('property_type', 'parameter_category', 'parameter_values')
            ->where('property_type_id', $request->property_type_id)->get();

        return response()->json($parameters);
    }
}
