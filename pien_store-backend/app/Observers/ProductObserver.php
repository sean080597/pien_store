<?php

namespace App\Observers;

use App\Product;
use Illuminate\Support\Str;

class ProductObserver
{
    public function retrieved(Product $product)
    {
      $product->image = $product->load('image:src,imageable_id');
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
