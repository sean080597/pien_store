<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\ImageGallery;

class ImageGallerySeeder extends Seeder
{
    public function insert_data($title, $desc, $url){
        DB::table('image_galleries')->insert([
            'title' => $title,
            'description' => $desc,
            'slug' => str_slug($title),
            'url' => $url,
            'url_type' => 'external',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
    public function run()
    {
        $common_desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
        self::insert_data('Title 1', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/01.c62ad7d5.jpg');
        self::insert_data('Title 2', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/02.6851c6ee.jpg');
        self::insert_data('Title 3', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/03.d2e9a990.jpg');
        self::insert_data('Title 4', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/04.4811168f.jpg');
        self::insert_data('Title 5', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/05.7364be44.jpg');
        self::insert_data('Title 6', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/06.b2c9ff85.jpg');
        self::insert_data('Title 7', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/07.a54820e6.jpg');
        self::insert_data('Title 8', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/08.286acff1.jpg');
        self::insert_data('Title 9', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/09.663ecdfb.jpg');
        self::insert_data('Title 10', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/10.558a8794.jpg');
        self::insert_data('Title 11', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/11.df00c4cb.jpg');
        self::insert_data('Title 12', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/12.dd68c775.jpg');
        self::insert_data('Title 13', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/13.7c0145a7.jpg');
        self::insert_data('Title 14', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/14.bd0230a4.jpg');
        self::insert_data('Title 15', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/15.82b405c5.jpg');
        self::insert_data('Title 16', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/16.8656d7ac.jpg');
        self::insert_data('Title 17', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/17.1a403c78.jpg');
        self::insert_data('Title 18', $common_desc, 'https://about.phamvanlam.com/lazy-loading-image-demo/static/media/18.1b768b16.jpg');
        self::insert_data('Title 20', $common_desc, 'https://source.unsplash.com/2ShvY8Lf6l0/800x599');
        self::insert_data('Title 21', $common_desc, 'https://source.unsplash.com/Dm-qxdynoEc/800x799');
        self::insert_data('Title 22', $common_desc, 'https://source.unsplash.com/qDkso9nvCg0/600x799');
        self::insert_data('Title 23', $common_desc, 'https://source.unsplash.com/iecJiKe_RNg/600x799');
        self::insert_data('Title 24', $common_desc, 'https://source.unsplash.com/epcsn8Ed8kY/600x799');
        self::insert_data('Title 25', $common_desc, 'https://source.unsplash.com/NQSWvyVRIJk/800x599');
        self::insert_data('Title 26', $common_desc, 'https://source.unsplash.com/zh7GEuORbUw/600x799');
        self::insert_data('Title 27', $common_desc, 'https://source.unsplash.com/iecJiKe_RNg/600x799');
        self::insert_data('Title 28', $common_desc, 'https://source.unsplash.com/NQSWvyVRIJk/800x599');
        self::insert_data('Title 29', $common_desc, 'https://source.unsplash.com/zh7GEuORbUw/600x799');
        self::insert_data('Title 30', $common_desc, 'https://source.unsplash.com/PpOHJezOalU/800x599');
        self::insert_data('Title 21', $common_desc, 'https://source.unsplash.com/I1ASdgphUH4/800x599');
    }
}
