<?php

namespace App\Http\Controllers;

use App\OurStory;
use Illuminate\Http\Request;
use App\Traits\CommonService;

class OurStoryController extends Controller
{
    use CommonService;
    protected $ourStory;
    protected $default_page_size;

    public function __construct()
    {
        $this->middleware('jwt.auth', ['only' => ['createData', 'editData', 'deleteData']]);
        $this->ourStory = new OurStory;
        $this->default_page_size = 15;
    }

    public function createData(Request $request){}

    public function editData(Request $request, $id){}

    public function deleteData($id){}

    public function getData()
    {
        $ls_stories = $this->ourStory->all();
        return response()->json([
            'success' => true,
            'data' => $ls_stories
        ], 200);
    }
}
