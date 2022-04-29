<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function add(Request $request){

        if($request->hasFile('file')){
            $file = $request->file('file')->store('avatars');
            Photo::create([
                'directory' => asset($file),
            ]);
        }


        return response()->json(['result' => 'success'], 200);
    }

    public function get(){
        return \App\Models\Photo::all();
    }
}
