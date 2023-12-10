<?php

use App\Http\Controllers\ApiLocal\UserApiController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
});

Route::get('/login', [UserApiController::class, 'loginForm'])->name('login.page');
Route::get('/register', [UserApiController::class, 'registerForm'])->name('register.page');
Route::post('/register', [UserApiController::class, 'register'])->name('register.api');
Route::post('/login', [UserApiController::class, 'login'])->name('login.api');
