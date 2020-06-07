<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $incrementing = false;

    protected $table = 'categories';

    protected $keyType = 'string';

    protected $guarded = [];

    public static function boot() {
        parent::boot();
        static::deleting(function($cate) {
            $cate->image()->delete();
        });
    }

    public function products(){
        return $this->hasMany('App\Product');
    }

    public function image(){
        return $this->morphOne(Image::class, 'imageable');
      }
}
