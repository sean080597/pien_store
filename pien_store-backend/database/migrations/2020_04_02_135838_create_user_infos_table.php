<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_infos', function (Blueprint $table) {
            $table->bigIncrements('id');
            // $table->string('fullname', 50);
            $table->string('firstname', 50)->nullable();
            $table->string('midname', 30)->nullable();
            $table->string('lastname', 30)->nullable();
            $table->boolean('gender')->default('0');
            $table->date('birthday')->nullable();
            $table->char('phone', 10)->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('user_infoable_id', 30);
            $table->string('user_infoable_type', 30);
            $table->rememberToken();
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
        Schema::dropIfExists('user_infos');
    }
}
