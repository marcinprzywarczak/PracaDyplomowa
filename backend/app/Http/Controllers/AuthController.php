<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function logIn(Request $request)
    {
        $request->validate(
            [
                'email'    => 'required|string',
                'password' => 'required|string',
            ]
        );

        if (Auth::guard()->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return response()->json(['success' => 'success'], 200);
        }

        return response()->json(['error' => 'Invalid credentials']);
    }

    public function logOut(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['success' => 'success'], 200);
    }
}
