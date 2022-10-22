<?php

namespace App\Policies;

use App\Models\Firm;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FirmPolicy
{
    use HandlesAuthorization;

    public function updateFirm(User $user, Firm $firm) {
        return $user->can('firm.update')
            && $firm->id === $user->firm_id;
    }
}
