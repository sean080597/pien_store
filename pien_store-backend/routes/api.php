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
    // update customer info
    Route::post('updateCustomerInfo', 'AuthController@updateCustomerInfo');
    // search & paginate users
    Route::get('getSingleData/{id}', 'UserController@getSingleData');
    Route::post('searchData', 'UserController@searchData');
});

Route::group(['prefix' => 'product'], function () {
    Route::post('createNewProd', 'ProductController@createData');
    Route::post('updateProd/{id}', 'ProductController@editData');
    Route::delete('delete/{id}', 'ProductController@deleteData');
    Route::post('getAll/filterData', 'ProductController@filterData');
    Route::get('getAll/search/{search}/{cate_id?}/{pagination?}', 'ProductController@searchData');
    Route::get('getAll/{cate_id?}/{pagination?}', 'ProductController@getPaginatedData');
    Route::get('getSingle/{id}', 'ProductController@getSingleData');
    Route::get('getRelatedProduct/{id}', 'ProductController@getRelatedProduct');
});

Route::group(['prefix' => 'category'], function () {
    Route::get('getSingleData/{id}', 'CategoryController@getSingleData');
    Route::post('searchData', 'CategoryController@searchData');
});

Route::group(['prefix' => 'customer'], function () {
    Route::get('getOrderAddresses/{id}', 'CustomerController@getOrderAddresses');
    Route::post('createShipmentDetail/{cus_id}', 'CustomerController@createShipmentDetail');
    Route::delete('deleteShipmentDetail/{cus_id}/{shipment_id}', 'CustomerController@deleteShipmentDetail');
    Route::put('editShipmentDetail/{cus_id}', 'CustomerController@editShipmentDetail');
});

Route::group(['prefix' => 'order'], function () {
    Route::post('confirmOrderInfo', 'OrderController@confirmOrderInfo');
    Route::get('getPaginatedYourOrders/{cus_id}/{pagination?}', 'OrderController@getPaginatedYourOrders');
    Route::get('getSingle/{id}', 'OrderController@getSingleData');
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
});

Route::group(['prefix' => 'admin-category'], function () {
    Route::post('createData', 'CategoryController@createData');
    Route::put('editData/{id}', 'CategoryController@editData');
    Route::delete('deleteData/{id}', 'CategoryController@deleteData');
});

Route::get('test', function () {
    var_dump(new DateTime);
});
