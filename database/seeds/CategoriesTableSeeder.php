<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::query()->truncate();
        factory(Category::class, 10)->create()->each(function ($prod) {
            // $user->posts()->saveMany(factory(Posts::class, 5)->make());
            Category::create($prod);
        });
    }
}
