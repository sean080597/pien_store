<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    public $incrementing = false;

    protected $table = 'products';

    protected $keyType = 'string';

    protected $guarded = [];

    public static function boot() {
      parent::boot();
      static::deleting(function($cate) {
          $cate->image()->delete();
      });
  }

    public function category(){
        return $this->belongsTo('App\Category');
    }

    public function image(){
      return $this->morphOne(Image::class, 'imageable');
    }

    public function orderDetails(){
      return $this->hasMany('App\OrderDetail');
    }

    public function orders(){
      return $this->belongsToMany('App\Order');
  }
}
