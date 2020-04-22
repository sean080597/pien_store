<?php

namespace App\Observers;

use App\ImageGallery;

class ImageGalleryObserver
{
    public function creating(ImageGallery $image)
    {
      $image->slug = str_slug($image->title, '-');
    }

    public function saving(ImageGallery $image)
    {
      $image->slug = str_slug($image->title, '-');
    }
}
