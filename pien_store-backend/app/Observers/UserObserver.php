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
}
