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
});


Route::group(['prefix' => 'product'], function () {
    Route::post('createNewProd', 'ProductController@createData');
    Route::get('getAll/{cate_id}/{pagination?}', 'ProductController@getPaginatedData');
    Route::post('updateProd/{id}', 'ProductController@editData');
    Route::post('delete/{id}', 'ProductController@deleteData');
    Route::get('getSingle/{id}', 'ProductController@getSingleData');
    Route::get('getAll/search/{cate_id}/{search}/{pagination?}', 'ProductController@searchData');
});
