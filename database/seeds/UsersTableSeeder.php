<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function insert_data($firstname, $lastname, $email){
        $faker = Faker::create();
        DB::table('users')->insert([
            'firstname' => $firstname,
            'midname' => '',
            'lastname' => $lastname,
            'phone' => $faker->regexify('[0-9]{10}'),
            'email' => $email,
            'email_verified_at' => now(),
            'password' => Hash::make('secret'), // password
            'role_id' => 'adm',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
    public function run()
    {
        User::query()->truncate(); // truncate user table each time of seeders run
        // User::create([ // create a new user
        //     'email' => 'admin@admin.com',
        //     'password' => Hash::make('secret'),
        //     'firstname' => 'Luu',
        //     'lastname' => 'Sean',
        // ]);
        self::insert_data('Luu', 'Sean', 'admin@adm.com');
        self::insert_data('Le', 'Phu', 'manager@mgr.com');
        self::insert_data('Le', 'Man', 'staff@stf.com');
        self::insert_data('Quang', 'Khanh', 'customer@cus.com');
        factory(User::class, 30)->create();
    }
}
