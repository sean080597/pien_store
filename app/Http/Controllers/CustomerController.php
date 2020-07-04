<?php

namespace App\Http\Controllers;

use App\Customer;
use App\AddressInfo;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;
use Config;

class CustomerController extends Controller
{
    use CommonService;
    protected $customer;
    protected $addressInfo;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->customer = new Customer;
        $this->addressInfo = new AddressInfo;
    }

    public function getOrderAddresses()
    {
        $cus_id = auth()->user()->user_infoable->id;
        // get list of shipment
        $shipment_data = $this->customer::find($cus_id)->addressInfo;
        $user_info_data = $this->customer::find($cus_id)->user_infoable;
        $result = $shipment_data->push($user_info_data);
        $result = $result->filter(function($value, $key){
            return $value->firstname && $value->lastname && $value->phone && $value->address;
        });
        $result->map(function($item, $key){
            $item->fullname = $item->getFullNameAttribute();
            $item->isChecked = false;
            $item->isEditable = false;
        });
        if($result->isNotEmpty()){
            $result->first()->isChecked = true;
        }
        return response()->json([
            'success' => true,
            'data' => $result
        ], 200);
    }

    public function createShipmentDetail(Request $request){
        $cus_id = auth()->user()->user_infoable->id;
        $shipment_data = $request->all();
        $shipment_data['isMainAddress'] = 0;
        $created_shipmentDetails = $this->customer::find($cus_id)->addressInfo()->create($shipment_data);
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

    public function deleteShipmentDetail($shipment_id){
        $cus_id = auth()->user()->user_infoable->id;
        $isDeleted = $this->customer::find($cus_id)->addressInfo()->find($shipment_id)->delete();
        if($isDeleted){
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.SHIPMENT_DETAILS_DELETED'),
            ], 200);
        }
    }

    public function editShipmentDetail(Request $request){
        $cus_id = auth()->user()->user_infoable->id;
        $findData = $this->customer::find($cus_id)->addressInfo()->find($request->id);
        $newData = $request->only(['firstname', 'midname', 'lastname', 'phone', 'address']);
        // update DB
        $updated_record = $findData->update($newData);
        if ($updated_record) {
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.SHIPMENT_DETAILS_EDITED'),
            ], 200);
        }
    }

    public function updateCustomerInfo(Request $request)
    {
        // update userInfo
        $newDataUser = $request->only(['gender', 'birthday', 'email']);
        if($this->isSetNotEmpty($request->password)) $newDataUser['password'] = Hash::make($request->password);
        $updatedUser = auth()->user()->update($newDataUser);
        // update address
        $newDataAddress = $request->only(['firstname', 'midname', 'lastname', 'phone', 'address']);
        $findData = $this->customer->find(auth()->user()->user_infoable->id);
        $addr = $this->addressInfo->where('addressable_id', auth()->user()->user_infoable->id)->where('isMainAddress', 1)->first();
        if($addr) $updatedAddress = $findData->addressInfo()->update($newDataAddress);
        else $updatedAddress = $findData->addressInfo()->create($newDataAddress);
        if ($updatedUser && $updatedAddress) {
            return response()->json([
                'success' => true,
                'message' => Config::get('constants.MSG.SUCCESS.USERINFO_UPDATED')
            ], 200);
        }
    }
}
