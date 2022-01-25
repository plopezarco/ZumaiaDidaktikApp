<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaliabideakController;
use App\Http\Controllers\JokoakController;
use App\Http\Controllers\KokapenakController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('baliabideak', [BaliabideakController::class, 'index']);
Route::get('baliabideak/{id}', [BaliabideakController::class, 'find']);
Route::get('jokoak', [JokoakController::class, 'index']);
Route::get('jokoak/{id}', [JokoakController::class, 'find']);
Route::get('kokapenak', [KokapenakController::class, 'index']);
Route::get('kokapenak/{id}', [KokapenakController::class, 'find']);
