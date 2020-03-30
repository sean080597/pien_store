<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use App\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function insert_data($id, $name){
        $faker = Faker::create();
        DB::table('categories')->insert([
            // 'id' => $faker->regexify('[A-Za-z0-9]{10}'),
            'id' => $id,
            'name' => $name,
            'slug' => str_slug($name),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
    public function run()
    {
        self::insert_data('CATE_01', 'categgoru 001');
        self::insert_data('CATE_02', 'catefoa 002');
        self::insert_data('CATE_03', 'catedadf 003');
    }
}
