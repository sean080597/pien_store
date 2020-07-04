<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = ['id'];
    protected $hidden = [
        'id', 'imageable_id', 'imageable_type', 'created_at', 'updated_at'
    ];
    public function imageable()
    {
        return $this->morphTo();
    }
}
