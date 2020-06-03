<?php

namespace App\Http\Controllers;

use App\User;
use App\UserInfo;
use Illuminate\Http\Request;
use App\Traits\CommonService;
use Illuminate\Support\Facades\Hash;
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
        $this->userinfo = new UserInfo;
        $this->default_page_size = 16;
        $this->user_role = auth()->user()->user_infoable->role_id;
    }

    public function createData(Request $request){
        if(\strcmp($this->user_role, 'adm') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        $validator = Validator::make($request->all(),
        [
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email|unique:user_infos',
            'password' => 'required|string|min:6',
            'role_id' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray()
            ], 400);
        }

        // create new user
        $createdUser = $this->user::create(['role_id' => $request->role_id]);
        if($createdUser){
            // create new userInfo
            $newData = $request->except('role_id');
            $newData['password'] = Hash::make($request->password);
            $createdUserInfo = $createdUser->user_infoable()->create($newData);
            if($createdUserInfo){
                return response()->json([
                    'success'=>true,
                    'message'=>Config::get('constants.MSG.SUCCESS.USER_CREATED'),
                    'data'=>$createdUser->user_infoable
                ], 200);
            }
            return response()->json(['success'=>false], 400);
        }
        return response()->json(['success'=>false], 400);
    }

    public function editData(Request $request, $id){}

    public function deleteData($id){}

    public function searchData($search = null, $pagination = null)
    {
        $page_size = $pagination ? $pagination : $this->default_page_size;
        $result = User::query()->with('image:src,imageable_id')
        ->select('users.id', 'users.role_id', 'ui.firstname', 'ui.midname', 'ui.lastname', 'ui.gender', 'ui.birthday', 'ui.phone', 'ui.address', 'ui.email')
        ->join('user_infos AS ui', 'ui.user_infoable_id', '=', 'users.id')
        ->when($search, function($query) use ($search){
            return $query->where('ui.firstname', 'LIKE', "%$search%")
            ->orWhere('ui.midname', 'LIKE', "%$search%")
            ->orWhere('ui.lastname', 'LIKE', "%$search%")
            ->orWhere('ui.phone', 'LIKE', "%$search%")
            ->orWhere('ui.address', 'LIKE', "%$search%")
            ->orWhere('ui.email', 'LIKE', "%$search%");
        })
        ->orderBy('ui.lastname', 'DESC')->paginate($page_size);

        return response()->json([
            'success' => true,
            'data' => $result
        ], 200);
    }
}
