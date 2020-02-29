<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::query()->truncate(); // truncate user table each time of seeders run
        // User::create([ // create a new user
        //     'email' => 'admin@admin.com',
        //     'password' => Hash::make('secret'),
        //     'firstname' => 'Luu',
        //     'lastname' => 'Sean',
        // ]);
        factory(User::class, 90)->create()->each(function ($user) {
            // $user->posts()->saveMany(factory(Posts::class, 5)->make());
            User::create($user);
        });
    }
}
