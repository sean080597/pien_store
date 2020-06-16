<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address_infos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('firstname', 50)->nullable();
            $table->string('midname', 30)->nullable();
            $table->string('lastname', 30)->nullable();
            $table->char('phone', 10)->nullable();
            $table->string('address')->nullable();
            $table->boolean('isMainAddress')->default(1);
            $table->string('addressable_id', 50);
            $table->string('addressable_type', 30);
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
        Schema::dropIfExists('address_infos');
    }
}
