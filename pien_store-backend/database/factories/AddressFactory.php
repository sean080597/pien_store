<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\AddressInfo;
use App\Model;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(AddressInfo::class, function (Faker $faker) {
    return [
        'firstname' => $faker->firstName,
        'midname' => '',
        'lastname' => $faker->lastName,
        'phone' => $faker->regexify('[0-9]{10}'),
        'address' => $faker->address,
        // 'addressable_type' => 'App\User',
        'addressable_type' => 'App\Customer',
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    ];
});
