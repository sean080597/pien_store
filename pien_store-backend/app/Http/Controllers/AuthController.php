<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CommonService;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User;
use App\UserInfo;
use App\Customer;
use Config;

class AuthController extends Controller
{
    protected $user, $cus, $userInfo;
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'register', 'authGoogleLogin']]);
        $this->user = new User;
        $this->cus = new Customer;
        $this->userInfo = new UserInfo;
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
        return response()->json(auth()->user()->load('user_infoable'));
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['success' => true, 'message' => Config::get('constants.MSG.SUCCESS.LOGOUT')]);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function authGoogleLogin(Request $request)
    {
        $token = '';
        //check if exists
        $findData = $this->userInfo->where('email', $request->email)->first();
        if($findData){
            //create jwt token
            $token = auth('api')->setTTL($request->expiresIn)->fromUser($findData);
        }else{
            //create new user if not exist
            $registerComplete = $this->cus::create([
                'id' => $request->googleId,
                'login_type' => 'google'
            ]);
            if($registerComplete){
                $registerComplete->user_infoable()->create([
                    'email' => $request->email,
                    'user_infoable_id' => $request->googleId,
                    'user_infoable_type' => 'App\Customer',
                ]);
                //create jwt token
                $token = auth('api')->setTTL($request->expiresIn)->fromUser($registerComplete->user_infoable);
            }
        }

        return response()->json([
            'token' => $token,
            'type' => 'bearer', // you can ommit this
            'expires' => $request->expiresIn, // time to expiration
        ], 200);
    }
}
