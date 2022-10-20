<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public static function updateUser($request, User $user) {
        $photoChanged = filter_var($request->input('photo_changed'), FILTER_VALIDATE_BOOLEAN);
        try {
            $userAvatar = '';
//            $user = User::findOrFail($request->input('user_id'));
            if($photoChanged){
                if($user->avatar !== 'avatars/default_avatar.jpg' && $user->avatar !== null)
                {
                    Storage::delete($user->avatar);
                }
                if($request->hasFile('user_avatar') && $request->file('user_avatar')->isValid()){
                    $userAvatar = $request->file('user_avatar')->store('avatars');

                    if(!is_string($userAvatar)){
                        return response()->json([
                            'error' => 'Błąd podczas zapisywania zdjęcia'
                        ], 400);
                    }
                } else {
                    $userAvatar = 'avatars/default_avatar.jpg';
                }
            }
            if($photoChanged) {
                $user->update([
                    'email' => $request->input('email'),
                    'first_name' => $request->input('first_name'),
                    'sure_name' => $request->input('sure_name'),
                    'phone_number' => $request->input('phone_number'),
                    'avatar' => $userAvatar,
                    'avatar_url' => asset($userAvatar),
                ]);
            } else {
                $user->update([
                    'email' => $request->input('email'),
                    'first_name' => $request->input('first_name'),
                    'sure_name' => $request->input('sure_name'),
                    'phone_number' => $request->input('phone_number'),
                ]);
            }

            return response()->json([
                'message' => 'suksces'
            ]);

        } catch (Exception $error){
            if(is_string($userAvatar)) {
                Storage::delete($userAvatar);
            }

            return response()->json([
                'error' => $error
            ], 400);
        }
    }
}
