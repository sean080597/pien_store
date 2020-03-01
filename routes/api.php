<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('jwt.auth')->get('users', function () {
//     return auth('api')->user();
// });

Route::group(['prefix' => 'user'], function(){
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});


Route::group(['prefix' => 'product', 'middleware' => 'jwt.auth'], function () {
    Route::post('createNewProduct', 'ProductController@createData');
    Route::get('get-all/{cate_id}/{pagination?}', 'ProductController@getPaginatedData');
    Route::post('updateProduct/{id}', 'ProductController@editData');
    Route::post('delete/{id}', 'ProductController@deleteData');
    Route::get('get-single/{id}', 'ProductController@getSingleData');
    Route::get('get-all/{search}/{cate_id}/{pagination?}', 'ProductController@searchData');
});
