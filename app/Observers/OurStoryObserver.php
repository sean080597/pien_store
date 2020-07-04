<?php

namespace App\Observers;

use App\OurStory;

class OurStoryObserver
{
    public function creating(OurStory $ourStory)
    {
        $ourStory->slug = str_slug($ourStory->title, '-');
    }

    public function saving(OurStory $ourStory)
    {
        $ourStory->slug = str_slug($ourStory->title, '-');
    }

    public function retrieved(OurStory $ourStory)
    {
        $ourStory->image = $ourStory->load('image:src,imageable_id');
    }
}
