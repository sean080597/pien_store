<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public $incrementing = false;

    protected $table = 'orders';

    protected $keyType = 'string';

    protected $guarded = [];

    public function orderDetails(){
        return $this->hasMany('App\OrderDetail', 'order_id', 'id');
    }

    public function customer(){
        return $this->belongsTo('App\Customer', 'cus_id', 'id');
    }

    public function shipmentable(){
        return $this->morphOne(ShipmentDetails::class, 'shipmentable');
    }

    public function products(){
        return $this->belongsToMany('App\Product', 'order_details', 'order_id', 'prod_id')->as('order_details')->withPivot('quantity');
    }
}
