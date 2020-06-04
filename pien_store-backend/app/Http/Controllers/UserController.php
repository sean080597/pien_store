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
    protected $file_directory;
    protected $default_user_image;
    protected $default_page_size;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->user = new User;
        $this->file_directory = Config::get('constants.FRONT_END.IMAGE_DIRECTORY').Config::get('constants.FRONT_END.PROFILES_DIR');
        // $this->file_directory = public_path('/assets/category_images/');
        $this->default_user_image = 'default-user-image.png';
        $this->default_page_size = 16;
    }

    public function getSingleData($id){
        $findData = $this->user->with('image:src,imageable_id', 'user_infoable')->find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.NOT_FOUND')], 500);
        }
        return response()->json(['success' => true, 'data' => $findData], 200);
    }

    public function createData(Request $request){
        // return str_replace(' ', '', $this->file_directory);
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // validate
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
            return response()->json(['success'=>false, 'message'=>$validator->messages()->toArray()], 400);
        }

        //handle image
        $input_image = $request->input_image;
        $file_name = '';
        if (is_null($input_image)) {
            $file_name = $this->default_user_image;
        } else {
            $isSaved = $this->checkSaveImage($input_image, $this->file_directory);
            if(strcmp($isSaved->getData()->success, true) === 0){
                $file_name = $isSaved->getData()->file_name;
            }else{
                return response()->json([
                    'success' => false,
                    'message' => $isSaved->getData()->error_msg
                ], 500);
            }
        }
        return response()->json([
            'success' => true,
            'image_dir' => $this->file_directory
        ], 500);

        // create new user
        // $createdUser = $this->user::create(['role_id' => $request->role_id]);
        // if($createdUser){
        //     $createdUser->image()->create(['src' => $file_name]);
        //     // create new userInfo
        //     $newData = $request->except(['role_id', 'input_image']);
        //     $newData['password'] = Hash::make($request->password);
        //     $createdUserInfo = $createdUser->user_infoable()->create($newData);
        //     if($createdUserInfo){
        //         return response()->json([
        //             'success'=>true,
        //             'message'=>Config::get('constants.MSG.SUCCESS.USER_CREATED'),
        //             'data'=>$createdUser->user_infoable
        //         ], 200);
        //     }
        // }
    }

    public function editData(Request $request, $id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->user::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID')], 500);
        }
        // validate
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
            return response()->json(['success'=>false, 'message'=>$validator->messages()->toArray()], 400);
        }

        //save record
        $updatedData = $findData->update(['role_id' => $request->role_id]);
        if ($updatedData) {
            $newData = $request->except('role_id');
            $newData['password'] = Hash::make($request->password);
            $updatedUserInfo = $findData->user_infoable()->update($newData);
            if($updatedUserInfo){
                return response()->json([
                    'success' => true,
                    'message' => Config::get('constants.MSG.SUCCESS.USERINFO_UPDATED'),
                    'data' => $findData->user_infoable
                ], 200);
            }
        }
    }

    public function deleteData($id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->user::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),], 500);
        }
        // delete data
        $getFile = $findData->image;
        if($getFile){
            $getFile->src == $this->default_user_image ?: unlink($this->file_directory . $getFile->src);
        }
        if ($findData->delete()) {
            return response()->json(['success' => true, 'message' => Config::get('constants.MSG.SUCCESS.USER_DELETED')], 200);
        }
    }

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

        return response()->json(['success' => true, 'data' => $result], 200);
    }
}
