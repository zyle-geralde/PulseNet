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
        
        if($valid_user){
            $user_exist=User::where('email',$valid_user['email'])->first();
        }
    }
}
