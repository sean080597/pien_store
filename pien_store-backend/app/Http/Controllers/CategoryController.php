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
    protected $default_category_image;
    protected $default_page_size;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->category = new Category;
        $this->file_directory = public_path('/assets/category_images/');
        $this->default_category_image = 'default-category-image.png';
        $this->default_page_size = 15;
    }

    public function createData(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'cate_id' => 'required|string|unique:categories,cate_id',
            'name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray(),
            ], 500);
        }

        //handle id
        $table_id = $this->quickRandomString(10);

        //handle file
        $fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        $category_image = $request->category_image;
        $file_name = '';
        if (is_null($category_image)) {
            $file_name = $this->default_category_image;
        } else {
            $isSaved = $this->checkSaveImage($fileTypes, $category_image, $this->file_directory);
            if(strcmp($isSaved->getData()->success, true) == 0){
                $file_name = $isSaved->getData()->file_name;
            }else{
                return response()->json([
                    'success' => false,
                    'message' => $isSaved->getData()->error_msg
                ], 500);
            }
        }

        //create new record
        $newData = $request->all()->except(['category_image']);
        $newData['id'] = $table_id;
        $newData['image'] = $file_name;
        $created_category = $this->category->create($newData);

        if ($created_category) {
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.CATEGORY_CREATED'),
            ], 200);
        }
    }

    public function editData(Request $request, $id)
    {
        $validator = Validator::make($request->all(),
        [
            'cate_id' => 'required|string|unique:categories,cate_id',
            'name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray(),
            ], 500);
        }

        $findData = $this->category::find($id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),
            ], 500);
        }
        //handle file
        $fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        $category_image = $request->category_image;
        $getFile = $findData->image;
        //remove old image first
        $getFile == $this->default_category_image ?: unlink($this->file_directory . $getFile);
        $file_name = '';
        if (is_null($category_image)) {
            $file_name = $this->default_category_image;
        } else {
            $isSaved = $this->checkSaveImage($fileTypes, $category_image, $this->file_directory);
            if(strcmp($isSaved->getData()->success, true) == 0){
                $file_name = $isSaved->getData()->file_name;
            }else{
                return response()->json([
                    'success' => false,
                    'message' => $isSaved->getData()->error_msg
                ], 500);
            }
        }

        $newData = $request->all();
        $newData['image'] = $file_name;
        $updated_category = $findData->update($newData);
        //save image file
        if ($updated_category) {
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.CATEGORY_UPDATED'),
            ], 200);
        }
    }

    public function deleteData($id)
    {
        $findData = $this->category::find($id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),
            ], 500);
        }
        $getFile = $findData->image;
        if ($findData->delete()) {
            strcmp($getFile, $this->default_category_image) == 0 ? : unlink($this->file_directory . $getFile);
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.CATEGORY_DELETED'),
            ], 200);
        }
    }

    public function getPaginatedData($pagination = null)
    {
        $page_size = $pagination ? $pagination : $this->default_page_size;
        $ls_categories = $this->category->orderBy('name', 'DESC')->paginate($page_size);
        return response()->json([
            'success' => true,
            'data' => $ls_categories,
            'file_directory' => $this->file_directory,
        ], 200);
    }

    public function getSingleData($id)
    {
        $findData = $this->category::find($id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => Config::get('constants.MSG.ERROR.NOT_FOUND')
            ], 500);
        }
        return response()->json([
            'success' => true,
            'data' => $findData,
            'file_directory' => $this->file_directory,
        ], 200);
    }

    public function searchData($search, $pagination = null)
    {
        $page_size = $pagination ? $pagination : $this->default_page_size;
        $paginated_search_query = $this->category->where(function ($query) use ($search) {
            $query->where('name', 'LIKE', "%$search%")
                ->orWhere('cate_id', 'LIKE', "%$search%");
        })->orderBy('name', 'DESC')->paginate($page_size);

        return response()->json([
            'success' => true,
            'data' => $paginated_search_query,
            'file_directory' => $this->file_directory,
        ], 200);
    }
}
