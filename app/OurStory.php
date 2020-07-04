<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OurStory extends Model
{
    protected $guarded = ['id'];

    public function image(){
        return $this->morphOne(Image::class, 'imageable');
      }
}
