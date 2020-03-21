<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CommonService;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User;
use Config;

class AuthController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'register', 'authGoogleLogin']]);
        $this->user = new User;
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(),
        [
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role_id' => 'required|string',
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
                'message'=>Config::get('constants.MSG.ERROR.EXIST_EMAIL')
            ], 400);
        }

        //handle id
        $user_id = $this->quickRandomString(20);
        $registerComplete = $this->user::create([
            'id' => $user_id,
            'firstname'=>$request->firstname,
            'lastname'=>$request->lastname,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role_id'=>$request->role_id
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

        return response()->json(['message' => Config::get('constants.MSG.SUCCESS.LOGOUT')]);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function authGoogleLogin(Request $request)
    {
        //check if exists
        $findData = $this->user->where('email', $request->email)->first();
        if($findData){
            //create jwt token
            $token = auth('api')->fromUser($findData);
            return response()->json([
                'stt'=>'exist',
                'token' => $token,
                'type' => 'bearer', // you can ommit this
                'expires' => auth('api')->factory()->getTTL() * 60, // time to expiration
            ], 200);
        }
        //create new user if not exist
        $registerComplete = $this->user::create([
            'id' => $request->googleId,
            'firstname'=>$request->firstname,
            'email'=>$request->email,
            'login_type' => 'google',
            'role_id'=>'cus'
        ]);
        if($registerComplete){
            //create jwt token
            $token = auth('api')->fromUser($registerComplete);
            return response()->json([
                'stt'=>'create',
                'token' => $token,
                'type' => 'bearer', // you can ommit this
                'expires' => auth('api')->factory()->getTTL() * 60, // time to expiration
            ], 200);
        }
    }
}
