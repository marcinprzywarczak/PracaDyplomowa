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


Route::post('/offers', [\App\Http\Controllers\OfferController::class, 'index']);

Route::get('/getPropertyType', [\App\Http\Controllers\PropertyTypeController::class, 'getPropertyType']);

Route::get('/getOfferType', [\App\Http\Controllers\OfferTypeController::class, 'getOfferType']);

Route::get('/getPropertyAndOfferTypes', [\App\Http\Controllers\OfferController::class, 'getOfferAndPropertyTypes']);

Route::post('/getParameters', [\App\Http\Controllers\ParameterController::class, 'getParametersForPropertyType']);

Route::post('/getOffer', [\App\Http\Controllers\OfferController::class, 'getOffer']);


Route::middleware('auth:sanctum')->group(function(){
    Route::name('offers.')->prefix('offers')->group(function (){
        Route::post('/store', [\App\Http\Controllers\OfferController::class, 'store']);
        Route::post('/update', [\App\Http\Controllers\OfferController::class, 'update']);
        Route::post('/userOffer', [\App\Http\Controllers\OfferController::class, 'getUserOffers']);
        Route::post('/addOfferToFollowing', [\App\Http\Controllers\OfferController::class, 'addOfferToFollowing']);
        Route::post('/getFollowingOffers', [\App\Http\Controllers\OfferController::class, 'getFollowOffers']);
        Route::post('/removeOfferFromFollowing',
            [\App\Http\Controllers\OfferController::class, 'removeOfferFromFollowing']);
        Route::post('/completeOffer', [\App\Http\Controllers\OfferController::class, 'completeOffer']);
        Route::post('/restoreOffer', [\App\Http\Controllers\OfferController::class, 'restoreOffer']);
        Route::post('/getOfferToEdit', [\App\Http\Controllers\OfferController::class, 'getOfferToEdit']);

    });

    Route::name('user.')->prefix('users')->group(function (){
        Route::post('/getUsers', [\App\Http\Controllers\UserController::class, 'index']);
        Route::post('/addUser', [\App\Http\Controllers\UserController::class, 'addNewFirmUser']);
        Route::post('/deleteFirmUser', [\App\Http\Controllers\UserController::class, 'deleteFirmUser']);
        Route::post('/updateFirmUser', [\App\Http\Controllers\UserController::class, 'updateFirmUser']);
        Route::post('/updateUser', [\App\Http\Controllers\UserController::class, 'updateUser']);
        Route::post('/updateFirm', [\App\Http\Controllers\UserController::class, 'updateFirm']);
        Route::get('/getPermissions', [\App\Http\Controllers\UserController::class, 'getPermissions']);
    });

    Route::name('messages.')->prefix('messages')->group(function (){
        Route::post('/getAllMessages', [\App\Http\Controllers\ChatsController::class, 'getAllMessages']);
        Route::post('/getMessagesForHeader', [\App\Http\Controllers\ChatsController::class, 'getMessagesForMessageHeader']);
        Route::post('/replyMessage', [\App\Http\Controllers\ChatsController::class, 'replyMessage']);
        Route::post('/setMessagesStatus', [\App\Http\Controllers\ChatsController::class, 'setMessagesStatus']);
        Route::post('/sendNewMessage', [\App\Http\Controllers\ChatsController::class, 'sendMessage']);
    });
});


Route::get('image/{path}/{filename}', function ($path, $filename) {
   $file = \Illuminate\Support\Facades\Storage::get("$path/$filename");
   return response($file, 200)->header('Content-Type', 'image/jpeg');
});
Route::get('messages', [\App\Http\Controllers\ChatsController::class, 'fetchMessages']);

