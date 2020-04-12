<?php

namespace App\Http\Controllers;

use App\Order;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;
use Config;
use DB;

class OrderController extends Controller
{
    use CommonService;
    protected $order;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->order = new Order;
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
}
