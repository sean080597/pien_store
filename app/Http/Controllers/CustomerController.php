<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use Illuminate\Routing\UrlGenerator;

class CustomerController extends Controller
{
    protected $customer;
    protected $base_url;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->customer = new Customer;
        $this->base_url = $urlGenerator->to('/');
    }

    public function addCustomer(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'token' => 'required',
            'firstname' => 'required|string',
            'phonenumber' => 'required|string'
        ]);
    }
}
