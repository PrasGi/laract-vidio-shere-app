<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'url' => [
                'store' => route('vidios.store.api'),
                'index' => route('vidios.index.api'),
                'app_url' => env('APP_URL'),
            ]
        ]);
    }
}
