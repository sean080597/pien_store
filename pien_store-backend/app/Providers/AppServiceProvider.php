<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Product;
use App\Category;
use App\Customer;
use App\Order;
use App\ImageGallery;
use App\OurStory;

use App\Observers\ProductObserver;
use App\Observers\CategoryObserver;
use App\Observers\CustomerObserver;
use App\Observers\OrderObserver;
use App\Observers\ImageGalleryObserver;
use App\Observers\OurStoryObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Product::observe(ProductObserver::class);
        Category::observe(CategoryObserver::class);
        Customer::observe(CustomerObserver::class);
        Order::observe(OrderObserver::class);
        ImageGallery::observe(ImageGalleryObserver::class);
        OurStory::observe(OurStoryObserver::class);
        // Log queries
        // if (true) {
        //     \DB::listen(function ($query) {
        //         \Log::info(
        //             $query->sql, $query->bindings, $query->time
        //         );
        //     });
        // }
    }
}
