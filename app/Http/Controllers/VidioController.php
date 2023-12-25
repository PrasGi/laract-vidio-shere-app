<?php

namespace App\Http\Controllers;

use App\Models\Vidio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VidioController extends Controller
{
    private $vidioModel;

    function __construct()
    {
        $this->vidioModel = new Vidio();
    }

    public function index()
    {
        return Inertia::render('Vidio/Index', [
            'url' => [
                'store' => route('vidios.store.api'),
                'index' => route('vidios.index.api'),
                'app_url' => env('APP_URL'),
            ]
        ]);
    }

    public function show(Vidio $vidio)
    {
        $vidio = $this->vidioModel->where('id', $vidio->id)->with('user')->first();
        return Inertia::render('Vidio/Detail', [
            'data' => $vidio,
            'url' => [
                'store' => route('vidios.store.api'),
                'index' => route('vidios.index.api'),
                'app_url' => env('APP_URL'),
            ]
        ]);
    }
}
