<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;

class CustomerController extends Controller
{
    use CommonService;
    protected $customer;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->customer = new Customer;
    }

    public function getOrderAddresses($id)
    {
        $result = $this->customer::find($id)->shipmentable;
        $result[] = $this->customer::find($id)->user_infoable;
        return response()->json([
            'success' => true,
            'data' => $result
        ], 200);
    }
}
