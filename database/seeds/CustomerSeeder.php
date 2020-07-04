<?php

use Illuminate\Database\Seeder;

use App\Customer;
use App\UserInfo;
use App\AddressInfo;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Customer::class, 30)->create()->each(function($user){
            factory(UserInfo::class)->create(['user_infoable_id' => $user->id]);
            factory(AddressInfo::class)->create(['addressable_id' => $user->id]);
        });
    }
}
