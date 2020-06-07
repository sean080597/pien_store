<?php

namespace App\Http\Controllers;

use App\Category;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;
use Image;
use Config;

class CategoryController extends Controller
{
    use CommonService;
    protected $category;
    protected $file_directory;
    protected $default_page_size;

    public function __construct()
    {
        $this->middleware('jwt.auth', ['only' => ['createData', 'editData', 'deleteData']]);
        $this->category = new Category;
        $this->file_directory = public_path('/assets/images/categories/');
        $this->default_page_size = 16;
    }

    public function getSingleData($id){
        $findData = $this->category->with('image:src,imageable_id')->find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.NOT_FOUND')], 500);
        }
        return response()->json(['success' => true, 'data' => $findData], 200);
    }

    public function createData(Request $request){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0 && \strcmp($user_role, 'mgr') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // validate
        $validator = Validator::make($request->all(),
        [
            'id' => 'string|unique:categories',
            'name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->messages()->toArray()], 500);
        }

        // create new data
        $createdCategory = $this->category::create($request->except('input_image'));
        if($createdCategory){
            //handle image
            $input_image = $request->input_image;
            $file_name = '';
            if ($this->isSetNotEmpty($input_image)) {
                $isSaved = $this->saveImage($input_image, $this->file_directory);
                if(strcmp($isSaved->getData()->success, true) === 0){
                    $file_name = $isSaved->getData()->file_name;
                }else{
                    return response()->json(['success' => false, 'message' => $isSaved->getData()->error_msg], 500);
                }
            }
            if ($this->isSetNotEmpty($file_name)) $createdCategory->image()->create(['src' => $file_name]);
            // result
            return response()->json([
                'success'=>true,
                'message'=>Config::get('constants.MSG.SUCCESS.CATEGORY_CREATED'),
                'data'=>$createdCategory
            ], 200);
        }
    }

    public function editData(Request $request, $id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0 && \strcmp($user_role, 'mgr') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->category::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID')], 500);
        }
        // validate data
        $validator = Validator::make($request->all(),
        [
            'id' => 'string|unique:categories',
            'name' => 'string'
        ]);

        if($validator->fails()){
            return response()->json(['success'=>false, 'message'=>$validator->messages()->toArray()], 400);
        }

        // save record
        $updatedData = $findData->update($request->except('input_image'));
        if ($updatedData) {
            // delete old image
            $input_image = $request->input_image;
            if($this->isSetNotEmpty($input_image)){
                if($this->isSetNotEmpty($findData->image)) unlink($this->file_directory . $findData->image->src);
                // create new image
                $file_name = '';
                $isSaved = $this->saveImage($input_image, $this->file_directory);
                if(strcmp($isSaved->getData()->success, true) === 0){
                    $file_name = $isSaved->getData()->file_name;
                }else{
                    return response()->json(['success' => false, 'message' => $isSaved->getData()->error_msg], 500);
                }
                // update new image record
                if($this->isSetNotEmpty($file_name)){
                    $this->isSetNotEmpty($findData->image) ? $findData->image()->update(['src' => $file_name]) : $findData->image()->create(['src' => $file_name]);
                }
            }
            // update data
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.CATEGORY_UPDATED'),
                'data' => $findData
            ], 200);
        }
    }

    public function deleteData($id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0 && \strcmp($user_role, 'mgr') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->category::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),], 500);
        }
        // delete data
        $getFile = $findData->image;
        if($this->isSetNotEmpty($getFile)) unlink($this->file_directory . $getFile->src);
        if ($findData->delete()) {
            return response()->json(['success' => true, 'message' => Config::get('constants.MSG.SUCCESS.CATEGORY_DELETED')], 200);
        }
    }

    public function searchData(Request $request){
        $sql = Category::query()->with('image:src,imageable_id')
        ->when($request->search, function($query) use ($request){
            $search = $request->search;
            return $query->where('id', 'LIKE', "%$search%")
            ->orWhere('name', 'LIKE', "%$search%");
        })
        ->orderBy('name', 'ASC');
        if($request->pageSize){
            $result = $sql->paginate($request->pageSize);
        }else{
            $result = $sql->get();
        }
        return response()->json(['success' => true, 'data' => $result], 200);
    }
}
