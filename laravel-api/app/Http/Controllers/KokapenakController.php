<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kokapenak;

class KokapenakController extends Controller
{
    public function index()
    {
        $kokapenak = Kokapenak::all();
        return response()->json($kokapenak,200);
    }

    public function find($id){
        $kokapena = Kokapenak::findOrFail($id);
        return response()->json($kokapena,200);
    }
}
