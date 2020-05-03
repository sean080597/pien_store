<?php

namespace App\Observers;

use App\Order;
use Illuminate\Support\Str;
use Config;

class OrderObserver
{
    public function creating(Order $order)
    {
      $order->id = Str::random(50);
      $order->status = Config::get('constants.ORDER_STATUS.PENDING');
    }
}
