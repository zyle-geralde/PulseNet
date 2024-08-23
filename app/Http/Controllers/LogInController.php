<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class LogInController extends Controller
{
    public function login(Request $request){

        $valid_user = $request->validate([
            'email'=>['required'],
            'password'=>['required']
        ]);

    
        $user_exist=User::where('email',$valid_user['email'])->first();
        if($user_exist){
            return response()->json([
                'message',true
            ]);
        }
        return response()->json([
            'message',false
        ]);
    }
}
