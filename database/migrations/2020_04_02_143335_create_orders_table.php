<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->string('id', 50);
            $table->string('status', 10);
            $table->string('cus_id', 30);
            $table->primary('id');
            $table->unsignedBigInteger('shipment_id');
            $table->foreign('cus_id')->references('id')->on('customers')->onUpdate('cascade');
            $table->foreign('shipment_id')->references('id')->on('address_infos')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
