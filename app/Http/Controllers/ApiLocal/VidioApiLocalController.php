<?php

namespace App\Http\Controllers\ApiLocal;

use App\Http\Controllers\Controller;
use App\Models\Vidio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VidioApiLocalController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('byUser')) {
            $datas = Vidio::where('user_id', auth()->user()->id)->orderByDesc("id")->get();
        } else {
            $datas = Vidio::orderByDesc("id")->get();
        }
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
        $payload = $request->only(['title', 'description', 'vidio']);
        $validate = Validator::make($payload, [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'vidio' => 'required|file|mimes:mp4,mov,ogg,qt',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status_code' => 401,
                'message' => $validate->errors()
            ]);
        }

        $payload['vidio'] = env('APP_URL') . '/storage/' . $request->file('vidio')->store('vidios');
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
