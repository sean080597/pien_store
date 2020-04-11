<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public $incrementing = false;

    protected $table = 'orders';

    protected $guarded = ['cus_id'];

    public function orderDetails(){
        return $this->hasMany('App\OrderDetail');
    }

    public function customer(){
        return $this->belongsTo('App\Customer');
    }

    public function shipmentable(){
        return $this->morphOne(ShipmentDetails::class, 'shipmentable');
    }
}
