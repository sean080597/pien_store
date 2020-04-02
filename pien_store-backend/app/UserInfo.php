<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
// JWT
use Tymon\JWTAuth\Contracts\JWTSubject;

class UserInfo extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table = 'user_infos';

    protected $guarded = ['id'];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function user_infoable()
    {
        return $this->morphTo();
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
