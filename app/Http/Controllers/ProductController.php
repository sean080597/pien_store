<?php

namespace App\Http\Controllers;

use App\Product;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use Validator;
use Image;

class ProductController extends Controller
{
    use CommonService;
    protected $product;
    protected $base_url;
    protected $file_directory;
    protected $default_product_image;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->middleware('jwt.auth');
        $this->product = new Product;
        $this->base_url = $urlGenerator->to('/');
        // $this->file_directory = url('/').'/assets/product_images/';
        $this->file_directory = public_path('/assets/product_images/');
        $this->default_product_image = 'default-product-image.png';
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
            //generate image file name
            $generate_name = uniqid() . '_' . time() . date('Ymd') . '_IMG';
            //get mime type
            $mimeType = Image::make($product_image)->mime();
            if (in_array($mimeType, $fileTypes)) {
                foreach ($fileTypes as $type) {
                    if (strcmp($type, $mimeType) == 0) {
                        $mime_split = explode('/', $type);
                        $file_name = $generate_name . '.' . end($mime_split);
                    }
                }
                //save image
                Image::make($product_image)->save($this->file_directory.$file_name);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Only png, jpg and jpeg files are accepted for setting profile pictures',
                ], 500);
            }
        }

        //create new record
        $newData = $request->all();
        $newData['id'] = $product_id;
        $newData['image'] = $file_name;
        $created_product = $this->product->create($newData);

        //save image file
        if ($created_product) {
            return response()->json([
                'success' => true,
                'message' => 'Product saved successfully',
            ], 200);
        }
    }

    public function getPaginatedData($cate_id, $pagination = null)
    {
        if (is_null($pagination) || empty($pagination)) {
            $ls_products = $this->product->where('category_id', $cate_id)->orderBy('name', 'DESC')->get()->toArray();
            return response()->json([
                'success' => true,
                'data' => $ls_products,
                'file_directory' => $this->file_directory,
            ], 200);
        }

        $product_paginated = $this->product->where('category_id', $cate_id)->orderBy('name', 'DESC')->paginate($pagination);
        return response()->json([
            'success' => true,
            'data' => $product_paginated,
            'file_directory' => $this->file_directory,
        ], 200);
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
                'message' => 'Please this content has no valid id',
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
            //generate image file name
            $generate_name = uniqid() . '_' . time() . date('Ymd') . '_IMG';
            //get mime type
            $mimeType = Image::make($product_image)->mime();
            if (in_array($mimeType, $fileTypes)) {
                foreach ($fileTypes as $type) {
                    if (strcmp($type, $mimeType) == 0) {
                        $mime_split = explode('/', $type);
                        $file_name = $generate_name . '.' . end($mime_split);
                    }
                }
                //save image
                Image::make($product_image)->save($this->file_directory.$file_name);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Only png, jpg and jpeg files are accepted for setting profile pictures',
                ], 500);
            }
        }

        $newData = $request->all();
        $newData['image'] = $file_name;
        $updated_product = $findData->update($newData);
        //save image file
        if ($updated_product) {
            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
            ], 200);
        }
    }

    public function deleteData($id)
    {
        $findData = $this->product::find($id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => 'Please this content has no valid id',
            ], 500);
        }
        $getFile = $findData->image;
        if ($findData->delete()) {
            strcmp($getFile, $this->default_product_image) == 0 ? : unlink($this->file_directory . $getFile);
            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully',
            ], 200);
        }
    }

    public function getSingleData($id)
    {
        $findData = $this->product::find($id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => 'Not found',
            ], 500);
        }
        return response()->json([
            'success' => true,
            'data' => $findData,
            'file_directory' => $this->file_directory,
        ], 200);
    }

    public function searchData($cate_id, $search, $pagination = null)
    {
        if (is_null($pagination) || empty($pagination)) {
            $non_paginated_search_query = $this->product->where('category_id', $cate_id)->
                where(function ($query) use ($search) {
                $query->where('name', 'LIKE', "%$search%")
                    ->orWhere('origin', 'LIKE', "%$search%")
                    ->orWhere('category_id', 'LIKE', "%$search%");
            })->orderBy('name', 'DESC')->get()->toArray();

            return response()->json([
                'success' => true,
                'data' => $non_paginated_search_query,
                'file_directory' => $this->file_directory,
            ], 200);
        }

        $paginated_search_query = $this->product->where('category_id', $cate_id)->
            where(function ($query) use ($search) {
            $query->where('name', 'LIKE', "%$search%")
                ->orWhere('origin', 'LIKE', "%$search%")
                ->orWhere('category_id', 'LIKE', "%$search%");
        })->orderBy('name', 'DESC')->paginate($pagination);

        return response()->json([
            'success' => true,
            'data' => $paginated_search_query,
            'file_directory' => $this->file_directory,
        ], 200);
    }
}
