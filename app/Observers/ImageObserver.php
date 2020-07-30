<?php

namespace App\Observers;

use App\Image;

class ImageObserver
{
    public function creating(Image $image){}

    public function saving(Image $image){}
}
