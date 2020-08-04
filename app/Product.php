<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    public $incrementing = false;

    protected $table = 'products';

    protected $keyType = 'string';

    protected $with = ['images'];

    protected $guarded = [];

    public static function boot() {
      parent::boot();
      static::deleting(function($cate) {
        $cate->images()->delete();
      });
  }

    public function category(){
      return $this->belongsTo('App\Category');
    }

    public function images(){
      return $this->morphMany(Image::class, 'imageable');
    }

    public function orderDetails(){
      return $this->hasMany('App\OrderDetail');
    }

    public function orders(){
      return $this->belongsToMany('App\Order');
  }
}
