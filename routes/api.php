<?php
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisteControllerr;
use App\Http\Controllers\LogInController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register',[RegisteControllerr::class,'register']);
Route::post('/loguser',[LogInController::class,'login']);

