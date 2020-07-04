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
// client
Route::group(['prefix' => 'user'], function(){
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('authGoogleLogin', 'AuthController@authGoogleLogin');
});

Route::group(['prefix' => 'product'], function () {
    Route::post('getAll/filterData', 'ProductController@filterData');
    Route::get('getSingleData/{id}', 'ProductController@getSingleData');
    Route::get('getRelatedProduct/{id}', 'ProductController@getRelatedProduct');
    Route::post('searchData', 'ProductController@searchData');
});

Route::group(['prefix' => 'category'], function () {
    Route::get('getSingleData/{id}', 'CategoryController@getSingleData');
    Route::post('searchData', 'CategoryController@searchData');
});

Route::group(['prefix' => 'customer'], function () {
    Route::post('updateCustomerInfo', 'CustomerController@updateCustomerInfo');
    Route::get('getOrderAddresses', 'CustomerController@getOrderAddresses');
    Route::post('createShipmentDetail', 'CustomerController@createShipmentDetail');
    Route::delete('deleteShipmentDetail/{shipment_id}', 'CustomerController@deleteShipmentDetail');
    Route::put('editShipmentDetail', 'CustomerController@editShipmentDetail');
});

Route::group(['prefix' => 'order'], function () {
    Route::post('confirmOrderInfo', 'OrderController@confirmOrderInfo');
    Route::post('searchData/{cus_id}', 'OrderController@searchData');
    Route::get('getSingleData/{id}', 'OrderController@getSingleData');
});

Route::group(['prefix' => 'image-gallery'], function () {
    Route::get('getData/{size?}/{pos?}', 'ImageGalleryController@getData');
});

Route::group(['prefix' => 'our-stories'], function () {
    Route::get('getData', 'OurStoryController@getData');
});
// admin
Route::group(['prefix' => 'admin-user'], function () {
    Route::post('createData', 'UserController@createData');
    Route::put('editData/{id}', 'UserController@editData');
    Route::delete('deleteData/{id}', 'UserController@deleteData');
    // search & paginate users
    Route::get('getSingleData/{id}', 'UserController@getSingleData');
    Route::post('searchData', 'UserController@searchData');
});

Route::group(['prefix' => 'admin-category'], function () {
    Route::post('createData', 'CategoryController@createData');
    Route::put('editData/{id}', 'CategoryController@editData');
    Route::delete('deleteData/{id}', 'CategoryController@deleteData');
});

Route::group(['prefix' => 'admin-product'], function () {
    Route::post('createData', 'ProductController@createData');
    Route::put('editData/{id}', 'ProductController@editData');
    Route::delete('deleteData/{id}', 'ProductController@deleteData');
    Route::post('searchData', 'ProductController@searchDataAdmin');
});

Route::group(['prefix' => 'admin-order'], function () {
    Route::put('editData/{id}', 'OrderController@editData');
    Route::delete('deleteData/{id}', 'OrderController@deleteData');
});

Route::group(['prefix' => 'admin-role'], function () {
    Route::get('getAllData', 'RoleController@getAllData');
});

Route::get('test', function () {
    var_dump(new DateTime);
});
