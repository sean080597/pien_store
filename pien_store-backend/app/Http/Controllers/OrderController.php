<?php

namespace App\Http\Controllers;

use App\Order;
use App\Customer;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;
use Config;
use DB;

class OrderController extends Controller
{
    use CommonService;
    protected $order;
    protected $customer;
    protected $default_page_size;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->order = new Order;
        $this->customer = new Customer;
        $this->default_page_size = 16;
    }

    public function confirmOrderInfo(Request $request)
    {
        $created_order = $this->order::create([
            'status' => Config::get('constants.ORDER_STATUS.PENDING'),
            'cus_id' => $request->cus_id
        ]);
        if($created_order){
            for ($i = 0; $i < count($request->cart_items); $i++) {
                $order_info = $request->cart_items[$i];
                $order_info['order_id'] = $created_order->id;
                $order_details[] = $order_info;
            }
            //create many order details
            $created_order->orderDetails()->createMany($order_details);
            //create shipment details
            $created_order->shipmentable()->create($request->shipment_details);
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.ORDER_CONFIRMED'),
            ], 200);
        }
    }

    public function getPaginatedYourOrders($cus_id, $pagination = null)
    {
        $page_size = $pagination ? $pagination : $this->default_page_size;
        $result = $this->customer::find($cus_id)->orders->load('shipmentable', 'orderDetails');

        return response()->json([
            'success' => true,
            'data' => $lsOrders
        ], 200);
    }
}
