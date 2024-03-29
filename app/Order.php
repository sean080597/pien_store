<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public $incrementing = false;

    protected $table = 'orders';

    protected $keyType = 'string';

    protected $guarded = [];

    public static function boot() {
        parent::boot();
        static::deleting(function($order) {
            $order->orderDetails()->each(function($orderDetail) {
                $orderDetail->delete();
            });
        });
    }

    public function orderDetails(){
        return $this->hasMany('App\OrderDetail', 'order_id', 'id');
    }

    public function customer(){
        return $this->belongsTo('App\Customer', 'cus_id', 'id');
    }

    public function addressInfo(){
        return $this->belongsTo('App\AddressInfo', 'shipment_id', 'id');
    }

    public function products(){
        return $this->belongsToMany('App\Product', 'order_details', 'order_id', 'prod_id')->as('order_details')->withPivot('quantity');
    }
}
