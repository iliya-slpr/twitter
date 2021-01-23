<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Route::prefix("api")->middleware('auth:api')->group(function (){

    Route::get("/tweets/my",[App\Http\Controllers\TweetController::class, 'myTweets']);
    Route::get("/tweets/explore",[App\Http\Controllers\TweetController::class, 'explore']);
    Route::post("/tweets/create",[App\Http\Controllers\TweetController::class, 'create']);
    Route::post("/tweets/delete",[App\Http\Controllers\TweetController::class, 'delete']);

    Route::post("/tweets/likeOrNot",[App\Http\Controllers\TweetController::class, 'likeOrNot']);
    Route::get("/tweets/getLikes",[App\Http\Controllers\TweetController::class, 'getLikes']);
});


