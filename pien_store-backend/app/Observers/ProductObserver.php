<?php

namespace App\Observers;

use App\Product;
use Illuminate\Support\Str;

class ProductObserver
{
    // private $checkRole = ['adm'];
    public function retrieved(Product $product)
    {
      // if(!auth('api')->user() || !in_array(auth('api')->user()->role_id, $this->checkRole)){
      //   $product->makeHidden('id');
      // }
    }

    public function creating(Product $product)
    {
      $product->id = Str::random(20);
      $product->slug = str_slug($product->name, '-');
    }

    public function saving(Product $product)
    {
      $product->slug = str_slug($product->name, '-');
    }
}
