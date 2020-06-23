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

    public static function boot() {
        parent::boot();
        static::deleting(function($cus) {
            $cus->image()->delete();
            $cus->user_infoable()->delete();
            $cus->addressInfo()->delete();
        });
    }

    public function image(){
        return $this->morphOne(Image::class, 'imageable');
    }

    public function user_infoable(){
        return $this->morphOne(UserInfo::class, 'user_infoable');
    }

    public function addressInfo(){
        return $this->morphMany(AddressInfo::class, 'addressable');
    }

    public function orders(){
        return $this->hasMany('App\Order', 'cus_id', 'id');
    }
}
