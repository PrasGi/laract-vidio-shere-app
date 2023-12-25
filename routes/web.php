<?php

use App\Http\Controllers\ApiLocal\UserApiController;
use App\Http\Controllers\ApiLocal\VidioApiLocalController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VidioController;
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

Route::middleware(['auth'])->group(function () {
    Route::get('/logout', [UserApiController::class, 'logout'])->name('logout.api');

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/vidios', [VidioController::class, 'index'])->name('vidios.index');
    Route::get('/vidios/{vidio}', [VidioController::class, 'show'])->name('vidios.show');

    // * API LOCAL Vidio * //
    Route::prefix('data')->group(function () {
        Route::get('/vidios', [VidioApiLocalController::class, 'index'])->name('vidios.index.api');
        Route::post('/vidios', [VidioApiLocalController::class, 'store'])->name('vidios.store.api');
        Route::delete('/vidios/{vidio}', [VidioApiLocalController::class, 'destroy'])->name('vidios.destroy.api');
    });
});

// * API LOCAL Auth * //

Route::get('/login', [UserApiController::class, 'loginForm'])->name('login.page');
Route::get('/register', [UserApiController::class, 'registerForm'])->name('register.page');
Route::post('/register', [UserApiController::class, 'register'])->name('register.api');
Route::post('/login', [UserApiController::class, 'login'])->name('login.api');
