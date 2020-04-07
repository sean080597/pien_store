<?php

namespace App\Http\Controllers;

use App\Product;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use Validator;
use Image;
use Config;
use DB;

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
        $this->middleware('jwt.auth', ['only' => ['createData', 'editData', 'deleteData']]);
        $this->product = new Product;
        $this->base_url = $urlGenerator->to('/');
        // $this->file_directory = url('/').'/assets/product_images/';
        $this->file_directory = public_path('/assets/product_images/');
        $this->default_product_image = 'default-product-image.png';
        $this->default_page_size = 16;
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
        $newData = $request->except('product_image');
        // $newData = $request->all();
        $created_product = $this->product->create($newData);

        if ($created_product) {
            $created_product->image()->create(['url' => $file_name]);
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
        if($getFile){
            //remove old image first
            $getFile->url == $this->default_product_image ?: unlink($this->file_directory . $getFile->url);
            $findData->image()->delete();
        }

        //generate file name
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

        //save record
        $newData = $request->except('product_image');
        $updated_product = $findData->update($newData);

        if ($updated_product) {
            $findData->image()->create(['url' => $file_name]);
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
        if($getFile){
            //remove old image first
            $getFile->url == $this->default_product_image ?: unlink($this->file_directory . $getFile->url);
            $findData->image()->delete();
        }
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
        $query = Product::query()->with('image:url,imageable_id');
        if(isset($cate_id) && !empty($cate_id)){
            $query = $query->where('category_id', $cate_id);
        }
        $ls_products = $query->orderBy('name', 'DESC')->paginate($page_size);
        // return $query->toSql();
        return response()->json([
            'success' => true,
            'data' => $ls_products,
            'file_directory' => $this->file_directory,
        ], 200);
    }

    public function getSingleData($id)
    {
        $findData = $this->product::with('image:url,imageable_id')->find($id);
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

    public function filterData(){
      $page_size = request('page_size') ? request('page_size') : $this->default_page_size;
      $query = Product::query()->with('image:url,imageable_id');

      //check if exists cate_id
      $paginated_sort_query = $query->when(request('cate_id'), function ($q) {
        return $q->where('category_id', request('cate_id'));
      })->when(request('sort_price') == 'low', function ($q) {
        $q->orderByRaw("CAST(price as UNSIGNED) ASC");
      })->when(request('sort_price') == 'high', function ($q) {
        $q->orderByRaw("CAST(price as UNSIGNED) DESC");
      })->when(request('sort_price') == 'latest', function ($q) {
        $q->latest();
      })->paginate($page_size);

      return response()->json([
          'success' => true,
          'data' => $paginated_sort_query,
          'file_directory' => $this->file_directory,
      ], 200);
    }

    public function searchData($search, $cate_id = null, $paginate = null)
    {
      $page_size = $paginate ? $paginate : $this->default_page_size;
      $query = Product::query()->with('image:url,imageable_id');
      //check if exists cate_id
      $query->when($cate_id, function ($q, $cate_id) {
        return $q->where('category_id', $cate_id);
      });

      $paginated_search_query = $query->where(function ($q) use ($search) {
        $q->where('name', 'LIKE', "%$search%")
            ->orWhere('origin', 'LIKE', "%$search%")
            ->orWhere('category_id', 'LIKE', "%$search%");
      })->orderBy('name', 'DESC')->paginate($page_size);

      return response()->json([
          'success' => true,
          'data' => $paginated_search_query,
          'file_directory' => $this->file_directory,
      ], 200);
    }

    public function getRelatedProduct($id)
    {
        $findData = $this->product->find($id);
        $query = Product::query()->with('image:url,imageable_id');
        $lsRelatedProduct = $query->where('category_id', $findData->category_id)->inRandomOrder()->limit($this->default_page_size)->get();
        return response()->json([
            'success' => true,
            'data' => $lsRelatedProduct
        ], 200);
    }
}
