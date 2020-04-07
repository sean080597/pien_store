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
    Route::post('authGoogleLogin', 'AuthController@authGoogleLogin');
    Route::post('updateCustomerInfo', 'AuthController@updateCustomerInfo');
});


Route::group(['prefix' => 'product'], function () {
    Route::post('createNewProd', 'ProductController@createData');
    Route::post('updateProd/{id}', 'ProductController@editData');
    Route::post('delete/{id}', 'ProductController@deleteData');
    Route::post('getAll/filterData', 'ProductController@filterData');
    Route::get('getAll/search/{search}/{cate_id?}/{pagination?}', 'ProductController@searchData');
    Route::get('getAll/{cate_id?}/{pagination?}', 'ProductController@getPaginatedData');
    Route::get('getSingle/{id}', 'ProductController@getSingleData');
    Route::get('getRelatedProduct/{id}', 'ProductController@getRelatedProduct');
});

Route::group(['prefix' => 'category'], function () {
    Route::post('createNewCate', 'CategoryController@createData');
    Route::post('updateCate/{id}', 'CategoryController@editData');
    Route::post('delete/{id}', 'CategoryController@deleteData');
    Route::get('getAll/search/{search}/{pagination?}', 'CategoryController@searchData');
    Route::get('getAll/{pagination?}', 'CategoryController@getPaginatedData');
    Route::get('getSingle/{id}', 'CategoryController@getSingleData');
});
