<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use App\Traits\CommonService;
use Validator;

class ProductController extends Controller
{
    use CommonService;
    protected $product;
    protected $base_url;
    protected $file_directory;
    protected $default_product_image;

    public function __construct(UrlGenerator $urlGenerator){
        $this->middleware('jwt.auth');
        $this->product = new Product;
        $this->base_url = $urlGenerator->to('/');
        $this->file_directory = $this->base_url.'/profile_images';
        $this->default_product_image = 'default-product-image.png';
    }

    public function createData(Request $request){
        $validator = Validator::make($request->all(),
        [
            'id' => 'required|string|max:50',
            'name' => 'required|string',
            'price' => 'required|string|min:4|max:12',
            'category_id' => 'string|max:10'
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray()
            ], 500);
        }

        //handle file
        $fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        $product_image = $request->product_image;
        $file_name = '';
        if(is_null($product_image)){
            $file_name = $this->default_product_image;
        }else{
            $generate_name = uniqid().'_'.time().date('Ymd').'_IMG';
            $fileBin = file_get_contents($product_image);
            $mimeType = mime_content_type($fileBin);
            if(in_array($mimeType, $fileTypes)){
                foreach ($fileTypes as $type) {
                    if(strcmp($type, $mimeType) == 0){
                        $mime_split = explode($type);
                        $file_name = $generate_name.'.'.end($mime_split);
                    }
                }
            }else{
                return response()->json([
                    'success'=>false,
                    'message'=>'Only png, jpg and jpeg files are accepted for setting profile pictures'
                ], 500);
            }
        }

        //create new record
        $created_product = $this->product->create($request->all());

        //save image file
        if($created_product){
            file_put_contents('./profile_images/'.$file_name, $fileBin);
            return response()->json([
                'success' => true,
                'message' => 'Product saved successfully'
            ], 200);
        }
    }

    public function getPaginatedData($pagination = null, $cate_id)
    {
        if(is_null($pagination) || empty($pagination)){
            $ls_products = $this->product->where('category_id', $cate_id)->orderBy('name', 'DESC')->get()->toArray();
            return response()->json([
                'success'=>true,
                'data'=>$ls_products,
                'file_directory' => $file_directory
            ], 200);
        }

        $product_paginated = $this->product->where('category_id', $cate_id)->orderBy('name', 'DESC')->paginate($pagination);
        return response()->json([
            'success'=>true,
            'data'=>$product_paginated,
            'file_directory' => $file_directory
        ], 200);
    }

    public function editData(Request $request, $id)
    {
        $validator = Validator::make($request->all(),
        [
            'name' => 'required|string',
            'price' => 'required|string|min:4|max:12',
            'category_id' => 'string|max:10'
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->messages()->toArray()
            ], 500);
        }

        $findData = $this->product::find($id);
        if(!$findData){
            return response()->json([
                'success'=>false,
                'message'=>'Please this content has no valid id'
            ], 500);
        }
        $getFile = $findData->image;
        strcmp($getFile, $this->default_product_image) == 0 ? : unlink('./profile_images/'.$getFile);
        $product_image = $request->product_image;
        $file_name = '';
        if(is_null($product_image)){
            $file_name = $this->default_product_image;
        }else{
            $generate_name = uniqid().'_'.time().date('Ymd').'_IMG';
            $fileBin = file_get_contents($product_image);
            $mimeType = mime_content_type($fileBin);
            if(in_array($mimeType, $fileTypes)){
                foreach ($fileTypes as $type) {
                    if(strcmp($type, $mimeType) == 0){
                        $mime_split = explode($type);
                        $file_name = $generate_name.'.'.end($mime_split);
                    }
                }
            }else{
                return response()->json([
                    'success'=>false,
                    'message'=>'Only png, jpg and jpeg files are accepted for setting profile pictures'
                ], 500);
            }
        }

        $updated_product = $findData->update($request->all());
        //save image file
        if($updated_product){
            file_put_contents('./profile_images/'.$file_name, $fileBin);
            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully'
            ], 200);
        }
    }

    public function deleteData($id)
    {
        $findData = $this->product::find($id);
        if(!$findData){
            return response()->json([
                'success'=>false,
                'message'=>'Please this content has no valid id'
            ], 500);
        }
        $getFile = $findData->image;
        if(!$findData->delete()){
            strcmp($getFile, $this->default_product_image) == 0 ? : unlink('./profile_images/'.$getFile);
            return response()->json([
                'success'=>true,
                'message'=>'Product deleted successfully'
            ], 200);
        }
    }

    public function getSingleData($id)
    {
        $findData = $this->product::find($id);
        if(!$findData){
            return response()->json([
                'success'=>false,
                'message'=>'Please this content has no valid id'
            ], 500);
        }
        return response()->json([
            'success'=>true,
            'data'=>$findData,
            'file_directory'=>$file_directory
        ], 200);
    }

    public function searchData($search, $pagination=null, $cate_id)
    {
        if(is_null($pagination) || empty($pagination)){
            $non_paginated_search_query = $this->product->where('category_id', $cate_id)->
            where(function($query) use ($search){
                $query->where('name', 'LIKE', "%$search%")
                ->orWhere('origin', 'LIKE', "%$search%")
                ->orWhere('category_id', 'LIKE', "%$search%");
            })->orderBy('name', 'DESC')->get()->toArray();

            return response()->json([
                'success'=>true,
                'data'=>$non_paginated_search_query,
                'file_directory'=>$file_directory
            ], 200);
        }

        $paginated_search_query = $this->product->where('category_id', $cate_id)->
            where(function($query) use ($search){
                $query->where('name', 'LIKE', "%$search%")
                ->orWhere('origin', 'LIKE', "%$search%")
                ->orWhere('category_id', 'LIKE', "%$search%");
            })->orderBy('name', 'DESC')->paginate($pagination);

            return response()->json([
                'success'=>true,
                'data'=>$paginated_search_query,
                'file_directory'=>$file_directory
            ], 200);
    }
}
