<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateFirmRequest;
use App\Http\Requests\User\UpdateFirmUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\UserRequest;
use App\Models\Firm;
use App\Models\Offer;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;


class UserController extends Controller
{
    public function index(Request $request){
        $this->authorize('index', User::class);

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

    public function addNewFirmUser(UserRequest $request) {
        $this->authorize('addNewFirmUser', User::class);
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
                    $avatarSrc = 'public/default_avatar.jpg';
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

    public function deleteFirmUser(Request $request) {
        $user = User::findOrFail($request->input('userId'));
        $this->authorize('deleteFirmUser', $user);
        $user->delete();
        return response()->json([
            'message' => 'suksces'
        ]);
    }

    public function updateFirmUser(UpdateFirmUserRequest $request) {
        $user = User::findOrFail($request->input('user_id'));
        $this->authorize('updateFirmUser', $user);
        return UserService::updateUser($request, $user);
    }

    public function updateUser(UpdateUserRequest $request) {
        $user = Auth::user();
        return UserService::updateUser($request, $user);
    }

    public function updateFirm(UpdateFirmRequest $request) {
        $firm = Firm::findOrFail($request->input('firm_id'));
        $this->authorize('updateFirm', $firm);
        $photoChanged = filter_var($request->input('photo_changed'), FILTER_VALIDATE_BOOLEAN);
        try {
            $firmLogo = '';
            if($photoChanged) {
                if($firm->logo !== 'public/default_avatar.jpg' && $firm->logo !== null)
                {
                    Storage::delete($firm->logo);
                }
                if($request->hasFile('firm_logo') && $request->file('firm_logo')->isValid()){
                    $firmLogo = $request->file('firm_logo')->store('avatars');

                    if(!is_string($firmLogo)){
                        return response()->json([
                            'error' => 'Błąd podczas zapisywania logo firmy'
                        ], 400);
                    }
                } else {
                    $firmLogo = 'public/default_avatar.jpg';
                }
            }
            if($photoChanged) {
                $firm->update([
                    'name' => $request->input('name'),
                    'NIP' => $request->input('NIP'),
                    'REGON' => $request->input('REGON'),
                    'street' => $request->input('street'),
                    'number' => $request->input('number'),
                    'zip_code' => $request->input('zip_code'),
                    'locality' => $request->input('locality'),
                    'logo' => $firmLogo,
                    'logo_url' => asset($firmLogo),
                ]);
            } else {
                $firm->update([
                    'name' => $request->input('name'),
                    'NIP' => $request->input('NIP'),
                    'REGON' => $request->input('REGON'),
                    'street' => $request->input('street'),
                    'number' => $request->input('number'),
                    'zip_code' => $request->input('zip_code'),
                    'locality' => $request->input('locality'),
                ]);
            }

            return response()->json([
                'message' => 'suksces'
            ]);

        } catch (Exception $error){
            if(is_string($firmLogo)) {
                Storage::delete($firmLogo);
            }

            return response()->json([
                'error' => $error
            ], 400);
        }
    }
}
