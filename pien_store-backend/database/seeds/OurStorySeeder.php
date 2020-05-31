<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class OurStorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function insert_data($title, $desc){
        DB::table('our_stories')->insert([
            'title' => $title,
            'slug' => str_slug($title),
            'description' => $desc,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
    public function run()
    {
        $common_desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
        self::insert_data('Story 1', $common_desc);
        self::insert_data('Story 2', $common_desc);
        self::insert_data('Story 3', $common_desc);
        self::insert_data('Story 4', $common_desc);
    }
}
