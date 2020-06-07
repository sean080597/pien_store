<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public $incrementing = false;

    protected $table = 'users';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    // protected $fillable = [
    //     'id', 'firstname', 'lastname', 'email', 'password', 'phone', 'role_id', 'login_type'
    // ];

    protected $with = ['image'];

    protected $guarded = [];

    public static function boot() {
        parent::boot();
        static::deleting(function($user) {
            $user->image()->delete();
            $user->user_infoable()->delete();
            $user->addressable()->delete();
            // $post->comments->each(function($comment) {
            //     $comment->delete();
            // });
        });
    }

    public function role(){
        return $this->belongsTo('App\Role');
    }

    public function image(){
      return $this->morphOne(Image::class, 'imageable');
    }

    public function user_infoable(){
        return $this->morphOne(UserInfo::class, 'user_infoable');
    }

    public function addressable(){
        return $this->morphOne(AddressInfo::class, 'addressable');
    }
}
