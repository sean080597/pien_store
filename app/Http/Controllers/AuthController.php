<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login']]);
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(),
        [
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray()
            ], 400);
        }

        $check_email = $this->user->where('email', $request->email)->count();
        if($check_email > 0){
            return response()->json([
                'success'=>false,
                'message'=>'This email already exist please try another email'
            ], 400);
        }

        $registerComplete = $this->user::create([
            'firstname'=>$request->firstname,
            'lastname'=>$request->lastname,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);
        if($registerComplete){
            return $this->login($request);
        }
    }

    public function login(Request $request) {
        // get email and password from request
        $validator = Validator::make($request->only('email', 'password'),[
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray()
            ], 400);
        }

        $token = null;
        $credentials = $request->only('email', 'password');
        // try to auth and get the token using api authentication
        if (!$token = auth('api')->attempt($credentials)) {
            // if the credentials are wrong we send an unauthorized error in json format
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'token' => $token,
            'type' => 'bearer', // you can ommit this
            'expires' => auth('api')->factory()->getTTL() * 60, // time to expiration
        ], 200);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
}
