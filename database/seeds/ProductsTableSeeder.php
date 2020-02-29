<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::query()->truncate();
        factory(Product::class, 50)->create()->each(function ($prod) {
            // $user->posts()->saveMany(factory(Posts::class, 5)->make());
            Product::create($prod);
        });
    }
}
