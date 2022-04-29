<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return User::with('firm')->find(\Illuminate\Support\Facades\Auth::id());
});



Route::post('/isLogged', function () {
    return response()->json(['isLogged' => \Illuminate\Support\Facades\Auth::check()], 200);
});

Route::post('/photo', [\App\Http\Controllers\PhotoController::class, 'add']);

Route::get('/photoGet', [\App\Http\Controllers\PhotoController::class, 'get']);
