<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AddressInfo extends Model
{
    protected $table = 'address_infos';
    protected $guarded = ['id'];
    // protected $visible = ['id', 'phone', 'address'];
    protected $hidden = [
        'addressable_id', 'addressable_type'
    ];
    public function getFullNameAttribute()
    {
        return preg_replace('/\s+/', ' ', $this->firstname . ' ' . $this->midname . ' ' . $this->lastname);
    }
    public function addressable()
    {
        return $this->morphTo();
    }
}
