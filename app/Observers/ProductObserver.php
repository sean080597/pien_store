<?php

namespace App\Observers;

use App\Product;
use Illuminate\Support\Str;

class ProductObserver
{
  public function creating(Product $product)
  {
    $product->id = $product->id ? $product->id : Str::random(30);
    $product->slug = str_slug($product->name, '-');
  }

  public function saving(Product $product)
  {
    $product->slug = str_slug($product->name, '-');
  }
}
