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
        $ls_images = $this->image->offset($pos)->limit($page_size)->get();
        $result = collect();
        // make result
        $ls_images->each(function($item, $key) use($result){
            $obj = new PhotoGallery();
            $obj->key = \strval($item->id);
            $obj->title = $item->title;
            $obj->src = $item->url;
            // calculate ratio
            $img_width = Image::make($item->url)->width();
            $img_height = Image::make($item->url)->height();
            $aspectRatio = round($img_width/$img_height, 1);
            $obj->width = $this->dec2frac($aspectRatio)->getData()->numerator;
            $obj->height = $this->dec2frac($aspectRatio)->getData()->denominator;
            $result->push($obj);
        });
        return response()->json([
            'success' => true,
            'data' => $result
        ], 200);
    }
}
