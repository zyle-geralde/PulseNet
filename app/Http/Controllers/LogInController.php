<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LogInController extends Controller
{
    public function login(Request $request){

        $valid_user = $request->validate([
            'email'=>['required'],
            'password'=>['required'],
            'token_name' => ['required', 'string']
        ]);

        try{
            $user_exist=User::where('email',$valid_user['email'])->first();
            
            if($user_exist && Hash::check($valid_user['password'],$user_exist->password)){
                $tokenName = $valid_user['token_name'];
                $token = $user_exist->createToken($tokenName)->plainTextToken;

                return response()->json([
                    'message'=>$token
                ]);
            }
            return response()->json([
                'message'=>'false'
            ]);
        }
        catch(\Exception $e){
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500); // Internal Server Error
        }
    
    }
}
