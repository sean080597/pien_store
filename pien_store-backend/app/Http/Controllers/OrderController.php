<?php

namespace App\Http\Controllers;

use App\Order;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;

class OrderController extends Controller
{
    use CommonService;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->middleware('jwt.auth');
    }

    
}
