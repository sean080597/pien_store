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
    protected $file_directory;
    protected $default_page_size;
    // protected $base_url;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->middleware('jwt.auth', ['only' => ['createData', 'editData', 'deleteData', 'searchDataAdmin']]);
        $this->product = new Product;
        // $this->base_url = $urlGenerator->to('/');
        // $this->file_directory = url('/').'/assets/product_images/';
        $this->file_directory = public_path('/assets/images/products/');
        $this->default_page_size = 18;
    }

    public function getSingleData($id){
        $findData = $this->product->with('images:src,imageable_id')->find($id);
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
        $validator = Validator::make($request->all(),
        [
            'id' => 'string|unique:products',
            'name' => 'required|string',
            'price' => 'required|string|min:4|max:12',
            'origin' => 'string',
            'category_id' => 'required|string|max:10|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->messages()->toArray()], 500);
        }

        // create new data
        $createdProduct = $this->product::create($request->except('input_image'));
        if($createdProduct){
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
            if ($this->isSetNotEmpty($file_name)) $createdProduct->image()->create(['src' => $file_name]);
            // result
            return response()->json([
                'success'=>true,
                'message'=>Config::get('constants.MSG.SUCCESS.PRODUCT_CREATED'),
                'data'=>$createdProduct
            ], 200);
        }
    }

    public function editData(Request $request, $id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0 && \strcmp($user_role, 'mgr') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->product::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID')], 500);
        }
        // validate data
        $validator = Validator::make($request->all(),
        [
            'id' => 'string|unique:products',
            'name' => 'string',
            'price' => 'string|min:4|max:12',
            'description' => 'nullable|string',
            'origin' => 'string',
            'category_id' => 'required|string|max:10|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->messages()->toArray()], 500);
        }
        // save record
        $updatedData = $findData->update($request->except('input_image'));
        if ($updatedData) {
            // delete old image
            $input_image = $request->input_image;
            if($this->isSetNotEmpty($input_image)){
                if($this->isSetNotEmpty($findData->image) && file_exists($this->file_directory.$findData->image->src)) unlink($this->file_directory.$findData->image->src);
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
                'message' => Config::get('constants.MSG.SUCCESS.PRODUCT_UPDATED'),
                'data' => $this->product::find($id)
            ], 200);
        }
    }

    public function deleteData($id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0 && \strcmp($user_role, 'mgr') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->product::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),], 500);
        }
        // delete data
        $getFile = $findData->image;
        if($this->isSetNotEmpty($getFile)) unlink($this->file_directory . $getFile->src);
        if ($findData->delete()) {
            return response()->json(['success' => true, 'message' => Config::get('constants.MSG.SUCCESS.PRODUCT_DELETED')], 200);
        }
    }

    public function filterData(){
      $page_size = request('page_size') ? request('page_size') : $this->default_page_size;
      $query = Product::query()->with('images:src,imageable_id');

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

    public function searchData(Request $request)
    {
        $sql = Product::query()->with('images:src,imageable_id')
        ->when($request->search, function($query) use ($request){
            $search = $request->search;
            return $query->where('name', 'LIKE', "%$search%")
            ->orWhere('origin', 'LIKE', "%$search%");
        })
        ->orderBy('name', 'ASC');
        if($request->pageSize){
            $result = $sql->paginate($request->pageSize);
        }else{
            $result = $sql->get();
        }
        return response()->json(['success' => true, 'data' => $result], 200);
    }

    public function searchDataAdmin(Request $request)
    {
        $sql = Product::query()->with('images:src,imageable_id')
        ->select('products.id', 'products.name', 'products.slug', 'products.price', 'products.description', 'products.origin',
        'products.category_id', 'c.name AS category_name')
        ->join('categories AS c', 'c.id', '=', 'products.category_id')
        ->when($request->search, function($query) use ($request){
            $search = $request->search;
            return $query->where('name', 'LIKE', "%$search%")
            ->orWhere('origin', 'LIKE', "%$search%")
            ->orWhere('catename', 'LIKE', "%$search%");
        })
        ->orderBy('name', 'ASC');
        if($request->pageSize){
            $result = $sql->paginate($request->pageSize);
        }else{
            $result = $sql->get();
        }
        return response()->json(['success' => true, 'data' => $result], 200);
    }

    public function getRelatedProduct($id)
    {
        $findData = $this->product->find($id);
        $query = Product::query()->with('images:src,imageable_id');
        $lsRelatedProduct = $query->where('category_id', $findData->category_id)->where('id', '<>', $id)->inRandomOrder()->limit($this->default_page_size)->get();
        return response()->json([
            'success' => true,
            'data' => $lsRelatedProduct
        ], 200);
    }
}
