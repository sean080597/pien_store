<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'id' => $faker->regexify('[A-Za-z0-9]{50}'),
        'name' => $faker->productName,
        'price' => $faker->unique()->randomNumber,
        'description' => $faker->regexify('[A-Za-z0-9]{200}'),
        'origin' => $faker->country,
    ];
});
