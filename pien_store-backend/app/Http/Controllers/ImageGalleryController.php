<?php

namespace App\Http\Controllers;

use App\ImageGallery;
use Illuminate\Http\Request;
use App\Traits\CommonService;
use Image;
use App\ClientModel\PhotoGallery;

class ImageGalleryController extends Controller
{
    use CommonService;
    protected $image;
    protected $default_page_size;

    public function __construct()
    {
        $this->middleware('jwt.auth', ['only' => ['createData', 'editData', 'deleteData']]);
        $this->image = new ImageGallery;
        $this->default_page_size = 15;
    }

    public function createData(Request $request){}

    public function editData(Request $request, $id){}

    public function deleteData($id){}

    public function getData($size, $pos = 0)
    {
        $page_size = $size ? $size : $this->default_page_size;
        $ls_images = $this->image->select('id', 'title', 'src', 'width', 'height')->offset($pos)->limit($page_size)->get();
        $count = $this->image->count();
        // make result
        $ls_images->map(function($item, $key){
            $item->key = \strval($item->id);
        });
        return response()->json([
            'success' => true,
            'data' => $ls_images,
            'count' => $count
        ], 200);
    }
}
