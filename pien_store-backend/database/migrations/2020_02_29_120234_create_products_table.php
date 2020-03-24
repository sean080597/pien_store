<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->string('id', 50);
            $table->string('name');
            $table->string('price', 12);
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->string('origin', 50)->nullable();
            $table->primary('id');
            $table->string('category_id', 10);
            $table->timestamps();
            $table->foreign('category_id')->references('cate_id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
