<?php

namespace App\Http\Controllers;

use App\Product;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use Validator;
use Image;
use Config;

class ProductController extends Controller
{
    use CommonService;
    protected $product;
    protected $base_url;
    protected $file_directory;
    protected $default_product_image;
    protected $default_page_size;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->middleware('jwt.auth');
        $this->product = new Product;
        $this->base_url = $urlGenerator->to('/');
        // $this->file_directory = url('/').'/assets/product_images/';
        $this->file_directory = public_path('/assets/product_images/');
        $this->default_product_image = 'default-product-image.png';
        $this->default_page_size = 15;
    }

    public function createData(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'name' => 'required|string',
            'price' => 'required|string|min:4|max:12',
            'category_id' => 'required|string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray(),
            ], 500);
        }

        //handle id
        $product_id = $this->quickRandomString(20);

        //handle file
        $fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        $product_image = $request->product_image;
        $file_name = '';
        if (is_null($product_image)) {
            $file_name = $this->default_product_image;
        } else {
            $isSaved = $this->checkSaveImage($fileTypes, $product_image, $this->file_directory);
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
        $newData = $request->all()->except(['product_image']);
        $newData['id'] = $product_id;
        $newData['image'] = $file_name;
        $created_product = $this->product->create($newData);

        if ($created_product) {
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.PRODUCT_CREATED'),
            ], 200);
        }
    }

    public function editData(Request $request, $id)
    {
        $validator = Validator::make($request->all(),
        [
            'name' => 'required|string',
            'price' => 'required|string|min:4|max:12',
            'category_id' => 'string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray(),
            ], 500);
        }

        $findData = $this->product::find($id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),
            ], 500);
        }
        //handle file
        $fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        $product_image = $request->product_image;
        $getFile = $findData->image;
        //remove old image first
        $getFile == $this->default_product_image ?: unlink($this->file_directory . $getFile);
        $file_name = '';
        if (is_null($product_image)) {
            $file_name = $this->default_product_image;
        } else {
            $isSaved = $this->checkSaveImage($fileTypes, $product_image, $this->file_directory);
            if(strcmp($isSaved->getData()->success, true) == 0){
                $file_name = $isSaved->getData()->file_name;
            }else{
                return response()->json([
                    'success' => false,
                    'message' => $isSaved->getData()->error_msg
                ], 500);
            }
        }

        $newData = $request->all()->except(['product_image']);
        $newData['image'] = $file_name;
        $updated_product = $findData->update($newData);
        //save image file
        if ($updated_product) {
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.PRODUCT_UPDATED'),
            ], 200);
        }
    }

    public function deleteData($id)
    {
        $findData = $this->product::find($id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),
            ], 500);
        }
        $getFile = $findData->image;
        if ($findData->delete()) {
            strcmp($getFile, $this->default_product_image) == 0 ? : unlink($this->file_directory . $getFile);
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.PRODUCT_DELETED'),
            ], 200);
        }
    }

    public function getPaginatedData($cate_id = null, $pagination = null)
    {
        $page_size = $pagination ? $pagination : $this->default_page_size;
        if(is_null($cate_id) || empty($cate_id)){
            $ls_products = $this->product->orderBy('name', 'DESC')->paginate($page_size);
        }else{
            $ls_products = $this->product->where('category_id', $cate_id)->orderBy('name', 'DESC')->paginate($page_size);
        }
        return response()->json([
            'success' => true,
            'data' => $ls_products,
            'file_directory' => $this->file_directory,
        ], 200);
    }

    public function getSingleData($id)
    {
        $findData = $this->product::find($id);
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

    public function searchData($search, $cate_id = null, $pagination = null)
    {
        $page_size = $pagination ? $pagination : $this->default_page_size;
        $query = Product::query();
        if(isset($cate_id) && !empty($cate_id)){
            $query = $query->where('category_id', $cate_id);
        }

        $paginated_search_query = $query->where(function ($query) use ($search) {
            $query->where('name', 'LIKE', "%$search%")
                ->orWhere('origin', 'LIKE', "%$search%")
                ->orWhere('category_id', 'LIKE', "%$search%");
        })->orderBy('name', 'DESC')->paginate($page_size);

        return response()->json([
            'success' => true,
            'data' => $paginated_search_query,
            'file_directory' => $this->file_directory,
        ], 200);
    }
}
