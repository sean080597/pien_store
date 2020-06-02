<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Traits\CommonService;
use Validator;
use Config;
use DB;

class UserController extends Controller
{
    use CommonService;
    protected $user;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->user = new User;
        $this->default_page_size = 16;
    }

    public function createData(Request $request){
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

        //handle id
        $registerComplete = $this->user::create([
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

    public function editData(Request $request, $id){}

    public function deleteData($id){}

    public function searchData($search = null, $pagination = null)
    {
        $page_size = $pagination ? $pagination : $this->default_page_size;
        $paginated_search_query = DB::table('user_infos AS ui')->select('ui.*', 'u.role_id', 'i.src')
        ->join('users AS u', 'u.id', '=', 'ui.user_infoable_id')
        ->join('images AS i', 'i.imageable_id', '=', 'u.id')
        ->orderBy('ui.lastname', 'DESC')->paginate($page_size);

        return response()->json([
            'success' => true,
            'data' => $paginated_search_query
        ], 200);
    }
}
