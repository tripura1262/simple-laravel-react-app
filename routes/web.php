<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

// Route::get('/redirect/{social}','Auth\LoginController@socialLogin')->where('social','twitter|facebook|linkedin|google');

Route::get('/redirect/{social}', [AuthController::class, 'socialLogin'])->where('social','twitter|facebook|linkedin|google');

// Route::get('social/login',[ 'as'=> 'social.index', 'uses'=> 'social_login\SocialLoginController@index']);
// Route::get('auth/{provider}','social_login\SocialLoginController@redirectToProvider');
// Route::get('auth/{provider}/callback', 'social_login\SocialLoginController@handleProviderCallback');
