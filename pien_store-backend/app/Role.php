<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';

    protected $keyType = 'string';

    protected $fillable = [
        'id','name'
    ];

    public function users(){
        return $this->hasMany('App\User');
    }
}
