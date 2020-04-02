<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\UserInfo;
use App\Model;
use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(UserInfo::class, function (Faker $faker) {
    return [
        // 'fullname' => $faker->name,
        'firstname' => $faker->firstName,
        'midname' => '',
        'lastname' => $faker->lastName,
        'phone' => $faker->regexify('[0-9]{10}'),
        'gender' => $faker->randomElement(['0', '1']),
        'address' => $faker->address,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => Hash::make('secret'), // password
        'user_infoable_id' => factory('App\User')->create()->id,
        'user_infoable_type' => 'App\User',
        // 'user_infoable_id' => factory('App\Customer')->create()->id,
        // 'user_infoable_type' => 'App\Customer',
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    ];
});
