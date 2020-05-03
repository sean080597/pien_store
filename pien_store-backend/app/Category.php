<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $incrementing = false;

    protected $table = 'categories';

    protected $keyType = 'string';

    // protected $fillable = [
    //     'id', 'name'
    // ];

    protected $guarded = ['id'];

    public function products(){
        return $this->hasMany('App\Product');
    }

    public function image(){
        return $this->morphOne(Image::class, 'imageable');
      }
}
