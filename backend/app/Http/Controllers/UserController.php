<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends \Illuminate\Routing\Controller
{
    public function index(Request $request){
        $filters = $request->get('filters');
        $globalFilter = $filters['globalFilter'];

        $sortOrder = $filters['sortOrder'] === 1 ? 'ASC' : 'DESC';
        $users = User::where(function ($query){
            $query->where('firm_id', Auth::id());
        })->where(function ($query) use($globalFilter) {
            $query->where('id', 'like', '%'.$globalFilter.'%')
                ->orWhere('first_name', 'like', '%'.$globalFilter.'%')
                ->orWhere('sure_name', 'like', '%'.$globalFilter.'%')
                ->orWhere('email', 'like', '%'.$globalFilter.'%')
                ->orWhere('phone_number', 'like', '%'.$globalFilter.'%');
        })
            ->orderBy($filters['sortField'], $sortOrder);

        $recordCounts = count($users->get());
        $users = $users->skip($filters['first'])->take($filters['rows'])->get();
        
        return response()->json([
            'users' => $users,
            'totalRecords' => $recordCounts
        ]);
    }


    public function test(Request $request){
        $filters = $request->get('filters');
        dd($filters['sortField']);
        $sortOrder = $filters['sortOrder'] === 1 ? 'ASC' : 'DESC';
        $users = User::where('firm_id', Auth::id())->get()->orderBy($filters->sortField, $sortOrder)->get();

        return response()->json([
            'users' => $users,
        ]);
    }
}
