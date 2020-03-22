<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id', 30);
            // $table->bigIncrements('id');
            $table->string('firstname', 50);
            $table->string('midname', 30)->nullable();
            $table->string('lastname', 30)->nullable();
            $table->char('phone', 10)->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('login_type', 10)->default('registered');
            $table->string('role_id', 3);
            $table->primary('id');
            $table->foreign('role_id')->references('id')->on('roles')->onUpdate('cascade');
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
        Schema::dropIfExists('users');
    }
}
