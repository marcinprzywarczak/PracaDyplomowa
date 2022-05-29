<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    return response()->json(
        [
            'success' => 'success',
            'user' => $user = User::with('firm')->find(Auth::id()),
            'roles' => $user->getRoleNames(),
            'permissions' => $user->getAllPermissions(),
        ],
        200);
});



Route::post('/isLogged', function () {
    return response()->json(['isLogged' => \Illuminate\Support\Facades\Auth::check()], 200);
})->middleware('permission:users.store');

Route::post('/photo', [\App\Http\Controllers\PhotoController::class, 'add']);

Route::get('/photoGet', [\App\Http\Controllers\PhotoController::class, 'get']);

Route::post('/offers', [\App\Http\Controllers\OfferController::class, 'index']);

Route::get('/getPropertyType', [\App\Http\Controllers\PropertyTypeController::class, 'getPropertyType']);

Route::get('/getOfferType', [\App\Http\Controllers\OfferTypeController::class, 'getOfferType']);

Route::get('/getPropertyAndOfferTypes', [\App\Http\Controllers\OfferController::class, 'getOfferAndPropertyTypes']);

Route::post('/getParameters', [\App\Http\Controllers\ParameterController::class, 'index']);

Route::post('/getOffer', [\App\Http\Controllers\OfferController::class, 'getOffer']);
