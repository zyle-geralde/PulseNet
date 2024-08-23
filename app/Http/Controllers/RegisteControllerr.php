<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class RegisteControllerr extends Controller
{
    public function register(Request $request)
    {
        $valid_res = $request->validate([
            'name'=>['required','max:50'],
            'email'=>['required','min:3','max:30'],
            'password'=>['required','min:3','max:18']
        ]);

        $existing_user = User::where('email',$valid_res['email'])->first();

        if($existing_user){
            return response()->json(['message' => 'Email already existed']);
        }

        $valid_res['password'] = bcrypt($valid_res['password']);
        User::create($valid_res);

        return response()->json([
            'message' => 'Data received successfully!',
        ]);
    }
}
