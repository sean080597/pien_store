<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $incrementing = false;

    protected $table = 'customers';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    protected $guarded = [];

    public function image(){
        return $this->morphOne(Image::class, 'imageable');
    }

    public function user_infoable(){
        return $this->morphOne(UserInfo::class, 'user_infoable');
    }

    public function shipmentable(){
        return $this->morphMany(ShipmentDetails::class, 'shipmentable');
    }
}
