<?php
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisteControllerr;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/custom-data', [DataController::class, 'show']);
Route::post('/register',[RegisteControllerr::class,'register']);
