<?php

namespace App\Observers;

use App\Category;
use Illuminate\Support\Str;

class CategoryObserver
{
    // private $checkRole = ['adm'];
    // public function retrieved(Category $category)
    // {
      // if(!auth('api')->user() || !in_array(auth('api')->user()->role_id, $this->checkRole)){
      //   $category->makeHidden('id');
      // }
    // }

    public function retrieved(Category $category)
    {
        $category->image = $category->load('image:src,imageable_id');
    }

    public function creating(Category $category)
    {
      $category->id = Str::random(10);
      $category->slug = str_slug($category->name, '-');
    }

    public function saving(Category $category)
    {
      $category->slug = str_slug($category->name, '-');
    }
}
