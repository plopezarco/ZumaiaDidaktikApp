<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jokoak;

class JokoakController extends Controller
{
    public function index()
    {
        $jokoak = Jokoak::all();
        return response()->json($jokoak,200);
    }

    public function find($id){
        $jokoa = Jokoak::findOrFail($id);
        return response()->json($jokoa,200);
    }
}
