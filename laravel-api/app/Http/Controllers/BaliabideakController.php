<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Baliabideak;

class BaliabideakController extends Controller
{
    public function index()
    {
        $baliabideak = Baliabideak::all();
        return response()->json($baliabideak,200);
    }

    public function find($id){
        $baliabidea = Baliabideak::findOrFail($id);
        return response()->json($baliabidea,200);
    }
}
