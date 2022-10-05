<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserRequest;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;


class UserController extends \Illuminate\Routing\Controller
{
    public function index(Request $request){
        if(Auth::user()->firm_id === null){
            return response()->json([
                'users' => [],
                'totalRecords' => 0
            ]);
        }

        $filters = $request->get('filters');
        $globalFilter = $filters['globalFilter'];

        $sortOrder = $filters['sortOrder'] === 1 ? 'ASC' : 'DESC';
        $users = User::where(function ($query){
            $query->where('firm_id', Auth::user()->firm_id);
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
        $offer = Offer::with('parameters')->where('id', 2)->first();
//        $offer->parameters()->attach(
//            2,
//            [
//                'value' => 'qqtest',
//            ]
//        );
        $offer->parameters()->sync([1 => ['value' => 'test'], 2 => ['value' => 'test2']]);
        return response()->json([
            'offer' => $offer
        ]);
    }

    public function addNewFirmUser(UserRequest $request) {
        try {
            $avatarSrc = '';
            if($request->hasFile('user_avatar') && $request->file('user_avatar')->isValid()){
                $avatar = $request->file('user_avatar');
                $avatarSrc = $avatar->store('avatars');
                if(!is_string($avatarSrc)) {
                    return response()->json([
                        'error' => 'Błąd podczas zapisywania zdjęcia użytkownika'
                    ], 400);
                }
            }

            DB::transaction(function () use ($request, $avatarSrc){
                if($avatarSrc === ''){
                    $avatarSrc = 'avatars/default_avatar.jpg';
                }

                $user = User::create([
                    'first_name' => $request['first_name'],
                    'sure_name' => $request['sure_name'],
                    'email' => $request['email'],
                    'firm_id' => Auth::user()->firm_id,
                    'phone_number' => $request['phone_number'],
                    'password' => Hash::make($request['password']),
                    'avatar_url' => asset($avatarSrc),
                    'avatar' => $avatarSrc,
                ]);
                $employeeRole = Role::where('name', config('app.employee_role'))->first();
                if(isset($employeeRole))
                    $user->assignRole($employeeRole);
            });

            return response()->json([
                'message' => 'Pracownik został pomyślnie dodany!'
            ], 200);

        } catch (Exception $error){
            if(is_string($avatarSrc)){
                Storage::delete($avatarSrc);
            }
            return response()->json([
                'error' => $error,
            ], 400);
        }
    }
}
