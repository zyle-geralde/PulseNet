<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DataController extends Controller
{
    public function show()
    {
        // Example of static data
        $data = [
            ['id' => 1, 'title' => 'First Item', 'description' => 'This is the first item.'],
            ['id' => 2, 'title' => 'Second Item', 'description' => 'This is the second item.'],
            ['id' => 3, 'title' => 'Third Item', 'description' => 'This is the third item.']
        ];

        return response()->json($data);
    }
}
