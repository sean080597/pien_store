<?php

namespace App\Observers;

use App\Customer;

class CustomerObserver
{
    private $checkRole = ['adm', 'mgr'];
    public function retrieved(Customer $customer)
    {
      if(!auth('api')->user() || !auth('api')->user()->role_id || !in_array(auth('api')->user()->role_id, $this->checkRole)){
        $customer->shipmentable->makeHidden(['id', 'shipmentable_id', 'shipmentable_type', 'created_at', 'updated_at']);
        $customer->user_infoable->makeHidden(['id', 'email_verified_at', 'user_infoable_id', 'user_infoable_type', 'created_at', 'updated_at']);
      }
    }
}
