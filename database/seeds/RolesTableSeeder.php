<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function insert_data($id, $name){
        DB::table('roles')->insert([
            'id' => $id,
            'name' => $name,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
    public function run()
    {
        self::insert_data('adm', 'admin');
        self::insert_data('mgr', 'manager');
        self::insert_data('stf', 'staff');
        self::insert_data('cus', 'customer');
    }
}
