<?php

namespace App\Http\Controllers;

use App\Order;
use App\Traits\CommonService;
use Illuminate\Http\Request;
use Validator;

class OrderController extends Controller
{
    use CommonService;
    protected $orderInfo;
    protected $base_url;

    public function __construct(UrlGenerator $urlGenerator)
    {
        $this->middleware('jwt.auth');
        $this->orderInfo = new Order;
    }

    public function getCustomerOrderInfo()
    {
        $findData = $this->orderInfo::where('email', auth()->user()->email)->first();
        $newData = $request->all();
        $updated_userInfo = $findData->update($newData);
        //save image file
        if ($updated_userInfo) {
            return response()->json([
                'success' => true,
                // 'message' => Config::get('constants.MSG.SUCCESS.USERINFO_UPDATED')
            ], 200);
        }
    }
}
