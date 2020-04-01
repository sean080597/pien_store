<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public $incrementing = false;

    protected $table = 'invoices';

    protected $guarded = ['id', 'salesman_id', 'order_id'];

    public function salesman(){
        return $this->belongsTo('App\User');
    }

    public function order(){
        return $this->belongsTo('App\Order');
    }
}
