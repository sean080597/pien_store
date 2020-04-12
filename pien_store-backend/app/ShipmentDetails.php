<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShipmentDetails extends Model
{
    protected $table = 'shipment_details';
    protected $guarded = ['id'];
    // protected $visible = ['id', 'phone', 'address'];
    protected $hidden = [
        'shipmentable_id', 'shipmentable_type'
    ];
    public function getFullNameAttribute()
    {
        return preg_replace('/\s+/', ' ', $this->firstname . ' ' . $this->midname . ' ' . $this->lastname);
    }
    public function shipmentable()
    {
        return $this->morphTo();
    }
}
