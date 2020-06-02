<?php

namespace App\Observers;

use App\User;
use App\Traits\CommonService;

class UserObserver
{
    use CommonService;

    public function creating(User $user)
    {
        $user->id = $this->quickRandomString(30);
    }

    public function retrieved(User $user)
    {
        $user->userInfoable = $user->load('user_infoable');
        $user->image = $user->load('image:src,imageable_id');
        $user->role = $user->load('role');
    }
}
