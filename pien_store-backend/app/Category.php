<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $incrementing = false;

    protected $table = 'categories';

    protected $fillable = [
        'id', 'name', 'cate_id', 'image'
    ];

    public function products(){
        return $this->hasMany('App\Product');
    }
}
