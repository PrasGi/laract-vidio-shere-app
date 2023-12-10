<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VidioController extends Controller
{
    public function index()
    {
        return Inertia::render('Vidio/Index');
    }
}
