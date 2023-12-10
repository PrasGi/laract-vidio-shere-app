<?php

namespace App\Http\Controllers\ApiLocal;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserApiController extends Controller
{
    public function loginForm()
    {
        return Inertia::render('Login', [
            'register_url_form' => route('register.page'),
            'login_url' => route('login.api'),
        ]);
    }

    public function registerForm()
    {
        return Inertia::render('Register', [
            'login_url_form' => route('login.page'),
            'register_url' => route('register.api'),
        ]);
    }

    public function register(Request $request)
    {
        $validate = Validator::make($request->only('name', 'email', 'password'), [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|max:255',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 500,
                'message' => $validate->errors(),
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'user',
            'password' => bcrypt($request->password),
        ]);

        Auth::attempt($request->only('email', 'password'));

        return response()->json([
            'status_code' => 200,
            'message' => 'Register success',
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $validate = Validator::make($request->only('email', 'password'), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|max:255',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 500,
                'message' => $validate->errors(),
            ]);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Unauthorized',
            ]);
        }

        $user = User::where('email', $request->email)->first();

        return response()->json([
            'status_code' => 200,
            'message' => 'Login success',
            'user' => $user,
        ]);
    }
}
