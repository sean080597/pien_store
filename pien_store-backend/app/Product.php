<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'id', 'name', 'price', 'description', 'image', 'origin', 'category_id'
    ];

    public function category(){
        return $this->belongsTo('App\Category');
    }
}
