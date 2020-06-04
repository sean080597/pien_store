<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public $incrementing = false;

    protected $table = 'users';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    // protected $fillable = [
    //     'id', 'firstname', 'lastname', 'email', 'password', 'phone', 'role_id', 'login_type'
    // ];

    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    // protected $hidden = [
    //     'password', 'remember_token',
    // ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    // Please ADD this two methods at the end of the class

    public static function boot() {
        parent::boot();
        static::deleting(function($user) {
            $user->image()->delete();
            $user->user_infoable()->delete();
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

}
