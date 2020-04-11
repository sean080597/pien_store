<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShipmentDetails extends Model
{
    protected $table = 'shipment_details';
    protected $guarded = ['id'];
    public function shipmentable()
    {
        return $this->morphTo();
    }
}
