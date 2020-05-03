<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    public $incrementing = false;

    protected $table = 'products';

    protected $keyType = 'string';

    // protected $fillable = [
    //     'id', 'name', 'price', 'description', 'image', 'origin', 'category_id'
    // ];

    protected $guarded = ['id'];

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
