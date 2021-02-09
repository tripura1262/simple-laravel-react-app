<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeatherController;
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

Route::post("register", [AuthController::class, "userSignUp"]);

Route::post("login", [AuthController::class, "userLogin"]);

Route::group(["middleware" => "auth:api"], function () {
    Route::get("/items", [ItemsController::class, "index"]);
    Route::get("/item/{id}", [ItemsController::class, "edit"]);
    Route::post("/item", [ItemsController::class, "store"]);
    Route::put("/item/{id}", [ItemsController::class, "update"]);
    Route::delete("/item/{id}", [ItemsController::class, "destroy"]);

    Route::get("/users", [UserController::class, "index"]);
    Route::get("/user/{id}", [UserController::class, "edit"]);
    Route::post("/user", [UserController::class, "store"]);
    Route::put("/user/{id}", [UserController::class, "update"]);
    Route::delete("/user/{id}", [UserController::class, "destroy"]);

    Route::get("weather", [WeatherController::class, "index"]);
});

Route::get("/login/{social}/callback", [
    AuthController::class,
    "handleProviderCallback",
])->where("social", "twitter|facebook|linkedin|google|");
