<?php

namespace App\Policies;

use App\Models\Firm;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function index(User $user) {
        return $user->can('users.index');
    }

    public function addNewFirmUser(User $user) {
        return $user->can('users.store') && $user->firm_id !== null;
    }

    public function deleteFirmUser(User $user, User $userToDestroy) {
        return $user->can('users.destroy')
            && $userToDestroy->firm_id === $user->firm_id;
    }

    public function updateFirmUser(User $user, User $userToUpdate) {
        return $user->can('users.update')
            && $userToUpdate->firm_id === $user->firm_id;
    }
}
