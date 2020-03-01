<?php
 namespace App\Traits;
 trait CommonService
 {
    public function printThis(){
        echo json_encode(array('data'=>'daasd'));
    }
 }