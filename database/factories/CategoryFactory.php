<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'id' => $faker->regexify('[A-Za-z0-9]{10}'),
        'name' => $faker->productName
    ];
});