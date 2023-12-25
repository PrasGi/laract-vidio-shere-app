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
        $datas = $this->vidioModel->all();
        return Inertia::render('Vidio/Index', [
            'url' => [
                'store' => route('vidios.store.api'),
                'index' => route('vidios.index.api'),
                'app_url' => env('APP_URL'),
            ]
        ]);
    }
}
