<?php

namespace App\Http\Controllers\ApiLocal;

use App\Http\Controllers\Controller;
use App\Models\Vidio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VidioApiLocalController extends Controller
{

    private $vidioModel;

    public function __construct()
    {
        $this->vidioModel = new Vidio();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $datas = $this->vidioModel;

        if ($request->has('byUser')) {
            $datas = $datas->where('user_id', auth()->user()->id)->orderByDesc("id")->with('user');
        } else {
            $datas = $datas->orderByDesc("id")->with('user');
        }

        if ($request->has('search')) {
            $datas = $datas->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->has('user_id')) {
            $datas = $datas->where('user_id', $request->user_id);
        }

        $datas = $datas->get();
        return response()->json([
            'status_code' => 200,
            'message' => 'success get all vidios',
            'data' => $datas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $payload = $request->only(['title', 'description', 'vidio', 'thumbnail']);
        $validate = Validator::make($payload, [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'vidio' => 'required|file|mimes:mp4,mov,ogg,qt',
            'thumbnail' => 'required|file|mimes:jpg,jpeg,png',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 401,
                'message' => $validate->errors()
            ]);
        }

        $payload['vidio'] = env('APP_URL') . '/storage/' . $request->file('vidio')->store('vidios');
        $payload['thumbnail'] = env('APP_URL') . '/storage/' . $request->file('thumbnail')->store('thumbnails');
        $payload['user_id'] = auth()->user()->id;

        if ($vidio = Vidio::create($payload)) {
            return response()->json([
                'status_code' => 200,
                'message' => 'success create new vidio',
                'data' => $vidio,
            ]);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'server error, please contact admin',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vidio $vidio)
    {
        if ($vidio->delete()) {
            return response()->json([
                'status_code' => 200,
                'message' => 'success delete vidio',
            ]);
        }

        return response()->json([
            'status_code' => 500,
            'message' => 'server error, please contact admin',
        ]);
    }
}