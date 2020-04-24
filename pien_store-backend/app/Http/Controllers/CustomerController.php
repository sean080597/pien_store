<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;
use Config;

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
        $result = $result->filter(function($value, $key){
            return $value->firstname && $value->lastname && $value->phone && $value->address;
        });
        if($result->isNotEmpty()){
            $result[0]->isChecked = true;
        }
        return response()->json([
            'success' => true,
            'data' => $result
        ], 200);
    }

    public function createShipmentDetail(Request $request, $cus_id){
        $created_shipmentDetails = $this->customer::find($cus_id)->shipmentable()->create($request->all());
        $created_shipmentDetails->fullname = $created_shipmentDetails->getFullNameAttribute();
        $created_shipmentDetails->isChecked = false;
        $created_shipmentDetails->isEditable = false;
        if($created_shipmentDetails){
            return response()->json([
                'success' => true,
                'data' => $created_shipmentDetails,
                'message' => Config::get('constants.MSG.SUCCESS.SHIPMENT_DETAILS_CREATED'),
            ], 200);
        }
    }

    public function deleteShipmentDetail($cus_id, $shipment_id){
        $isDeleted = $this->customer::find($cus_id)->shipmentable()->find($shipment_id)->delete();
        if($isDeleted){
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.SHIPMENT_DETAILS_DELETED'),
            ], 200);
        }
    }

    public function editShipmentDetail(Request $request, $cus_id){
        $findData = $this->customer::find($cus_id)->shipmentable()->find($request->id);
        // filter new data to update
        $newData = [
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'address' => $request->address,
            'phone' => $request->phone
        ];
        // update DB
        $updated_record = $findData->update($newData);
        if ($updated_record) {
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.SHIPMENT_DETAILS_EDITED'),
            ], 200);
        }
    }
}
