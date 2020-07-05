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
        $this->middleware('jwt.auth', ['only' => ['createData', 'editData', 'deleteData', 'searchDataAdmin']]);
        $this->order = new Order;
        $this->order_detail = new OrderDetail;
        $this->customer = new Customer;
        $this->default_page_size = 16;
    }

    public function getSingleData($order_id){
        $findData = $this->order::with('addressInfo', 'products')->find($order_id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.NOT_FOUND')], 500);
        }
        return response()->json(['success' => true, 'data' => $findData], 200);
    }

    public function confirmOrderInfo(Request $request){
        // validate data
        $validator = Validator::make($request->all(),
        [
            'cus_id' => 'string|exists:customers,id',
            'shipment_id' => 'exists:address_infos,id'
        ]);

        if($validator->fails()){
            return response()->json(['success'=>false, 'message'=>$validator->messages()->toArray()], 400);
        }

        // create order
        $created_order = $this->order::create([
            'cus_id' => $request->cus_id,
            'shipment_id' => $request->shipment_id
        ]);
        if($created_order){
            for ($i = 0; $i < count($request->cart_items); $i++) {
                $order_info = $request->cart_items[$i];
                $order_info['status'] = Config::get('constants.ORDER_STATUS.RECEIVED');
                $order_info['order_id'] = $created_order->id;
                $order_details[] = $order_info;
            }
            //create many order details
            $created_order->orderDetails()->createMany($order_details);
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.ORDER_CONFIRMED'),
            ], 200);
        }
    }

    public function editData(Request $request, $id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0 && \strcmp($user_role, 'mgr') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->order::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID')], 500);
        }
        // update data
        $updatedData = $findData->update($request->all());
        if($updatedData){
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.ORDER_UPDATED'),
            ], 200);
        }
    }

    public function deleteData($id){
        $user_role = auth()->user()->user_infoable->role_id;
        if(\strcmp($user_role, 'adm') !== 0 && \strcmp($user_role, 'mgr') !== 0){
            return response()->json(['success'=>false, 'message'=>Config::get('constants.MSG.ERROR.FORBIDDEN')], 403);
        }
        // find data
        $findData = $this->category::find($id);
        if (!$findData) {
            return response()->json(['success' => false, 'message' => Config::get('constants.MSG.ERROR.INVALID_ID'),], 500);
        }
        // delete data
        $getFile = $findData->image;
        if($this->isSetNotEmpty($getFile)) unlink($this->file_directory . $getFile->src);
        if ($findData->delete()) {
            return response()->json(['success' => true, 'message' => Config::get('constants.MSG.SUCCESS.CATEGORY_DELETED')], 200);
        }
    }

    public function searchData(Request $request, $cus_id)
    {
        $sql = Order::query()->with('addressInfo', 'products')
        ->where('cus_id', $cus_id)
        ->when($request->search, function($query) use ($request){
            $search = $request->search;
            return $query->where('id', 'LIKE', "%$search%")
            ->orWhere('status', 'LIKE', "%$search%");
        })
        ->latest();
        if($request->pageSize){
            $result = $sql->paginate($request->pageSize);
        }else{
            $result = $sql->get();
        }
        return response()->json(['success' => true, 'data' => $result], 200);
    }

    public function searchDataAdmin(Request $request)
    {
        $sql = Order::query()->select('orders.id', 'orders.status', 'addr.firstname', 'addr.lastname', 'addr.phone', 'addr.address')
        ->join('address_infos AS addr', 'addr.id', '=', 'orders.shipment_id')->orderBy('orders.created_at', 'desc');

        // $lsOrders
        // ->join('order_details AS o', 'o.order_id', '=', 'orders.id')
        // ->join('products AS p', 'p.id', '=', 'o.prod_id')
        // ->when($request->search, function($query) use ($request){
        //     $search = $request->search;
        //     return $query->where('id', 'LIKE', "%$search%")
        //     ->orWhere('', 'LIKE', "%$search%")
        //     ->orWhere('status', 'LIKE', "%$search%");
        // })
        // $sql = Order::query()->with('addressInfo', 'products')
        // ->when($request->search, function($query) use ($request){
        //     $search = $request->search;
        //     return $query->where('id', 'LIKE', "%$search%")
        //     ->orWhere('status', 'LIKE', "%$search%");
        // })
        // ->latest();
        if($request->pageSize){
            $result = $sql->paginate($request->pageSize);
        }else{
            $result = $sql->get();
        }
        return response()->json(['success' => true, 'data' => $result], 200);
    }
}
