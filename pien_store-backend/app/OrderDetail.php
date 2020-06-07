<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    public $incrementing = false;

    protected $table = 'order_details';

    protected $keyType = 'string';

    protected $hidden = [
        'order_id', 'prod_id'
    ];

    protected $guarded = [];
}
