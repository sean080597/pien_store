<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderDetail;
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
    protected $order_detail;
    protected $customer;
    protected $default_page_size;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->order = new Order;
        $this->order_detail = new OrderDetail;
        $this->customer = new Customer;
        $this->default_page_size = 16;
    }

    public function confirmOrderInfo(Request $request)
    {
        $created_order = $this->order::create([
            'cus_id' => $request->cus_id
        ]);
        if($created_order){
            for ($i = 0; $i < count($request->cart_items); $i++) {
                $order_info = $request->cart_items[$i];
                $order_info['status'] = Config::get('constants.ORDER_STATUS.PENDING');
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
        $result = $this->order->with('shipmentable', 'products')->where('cus_id', $cus_id)->latest()->paginate($page_size);
        return response()->json([
            'success' => true,
            'data' => $result
        ], 200);
    }

    public function getSingleData($order_id)
    {
        $findData = $this->order::with('shipmentable', 'products')->find($order_id);
        if (!$findData) {
            return response()->json([
                'success' => false,
                'message' => Config::get('constants.MSG.ERROR.NOT_FOUND')
            ], 500);
        }
        return response()->json([
            'success' => true,
            'data' => $findData
        ], 200);
    }
}
