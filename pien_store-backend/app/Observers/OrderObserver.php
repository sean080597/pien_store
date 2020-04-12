<?php

namespace App\Observers;

use App\Order;
use Illuminate\Support\Str;

class OrderObserver
{
    public function creating(Order $order)
    {
      $order->id = Str::random(50);
    }
}
