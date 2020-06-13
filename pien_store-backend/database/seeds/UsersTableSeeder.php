<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use App\User;
use App\UserInfo;
use App\AddressInfo;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function insert_data($firstname, $lastname, $email, $role){
        $faker = Faker::create();
        $user_id = $faker->regexify('[0-9]{21}');
        DB::table('users')->insert([
            'id' => $user_id,
            'role_id' => $role,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('user_infos')->insert([
            'email' => $email,
            'email_verified_at' => now(),
            'password' => Hash::make('secret'), // password
            'user_infoable_id' => $user_id,
            'user_infoable_type' => 'App\User',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('address_infos')->insert([
            'firstname' => $firstname,
            'midname' => '',
            'lastname' => $lastname,
            'phone' => $faker->regexify('[0-9]{10}'),
            'address' => $faker->address,
            'addressable_id' => $user_id,
            'addressable_type' => 'App\User',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
    public function run()
    {
        // User::query()->truncate(); // truncate user table each time of seeders run
        // User::create([ // create a new user
        //     'email' => 'admin@admin.com',
        //     'password' => Hash::make('secret'),
        //     'firstname' => 'Luu',
        //     'lastname' => 'Sean',
        // ]);
        // self::insert_data('Luu', 'Sean', 'admin@adm.com', 'adm');
        // self::insert_data('Le', 'Phu', 'manager@mgr.com', 'mgr');
        // self::insert_data('Le', 'Man', 'staff@stf.com', 'stf');
        // self::insert_data('Quang', 'Khanh', 'customer@cus.com', 'cus');
        factory(User::class, 30)->create()->each(function($user){
            factory(UserInfo::class)->create(['user_infoable_id' => $user->id]);
            factory(AddressInfo::class)->create(['addressable_id' => $user->id]);
        });
    }
}
