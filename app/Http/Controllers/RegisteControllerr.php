<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RegisteControllerr extends Controller
{
    public function register(Request $request)
    {
        echo $request;
        $valid_res = $request->validate([
            'name'=>['required','max:50'],
            'email'=>['required','min:3','max:30'],
            'password'=>['required','min:3','max:18']
        ]);
        $valid_res['password'] = bcrypt($valid_res['password']);
        User::create($valid_res);

        return response()->json([
            'message' => 'Data received successfully!',
        ]);
    }
}
