<?php

namespace App\Observers;

use App\Customer;

class CustomerObserver
{
    private $checkRole = ['adm', 'mgr'];
    public function retrieved(Customer $customer)
    {
      if(!auth('api')->user() || !auth('api')->user()->role_id || !in_array(auth('api')->user()->role_id, $this->checkRole)){
        $customer->shipmentable->makeHidden(['id', 'created_at', 'updated_at']);
        $customer->user_infoable->makeHidden(['id', 'birthday', 'created_at', 'updated_at']);

        //combine first, mid, last name into fullname
        $customer->shipmentable->map(function($val, $key){
          $val->fullname = preg_replace('/\s+/', ' ', $val->firstname . ' ' . $val->midname . ' ' . $val->lastname);
          $key == 0 ? $val->isChecked = true : $val->isChecked = false;
        });

        $customer->user_infoable->fullname = preg_replace('/\s+/', ' ', $customer->user_infoable->firstname . ' ' . $customer->user_infoable->midname . ' ' . $customer->user_infoable->lastname);
        $customer->user_infoable->isChecked = false;
      }
    }
}
