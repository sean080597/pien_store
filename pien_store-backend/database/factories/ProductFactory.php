<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'id' => $faker->regexify('[A-Za-z0-9]{50}'),
        'name' => $faker->regexify('[A-Za-z0-9]{20}'),
        'price' => $faker->unique()->randomNumber(5),
        'description' => $faker->text($maxNbChars = 500),
        'origin' => $faker->country,
        'category_id' => $faker->randomElement(['CATE_01', 'CATE_02', 'CATE_03']),
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
    ];
});
