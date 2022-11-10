<?php

namespace App\Policies;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OfferPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Offer $offer) {
        if($user->firm_id !== null) {
            return $user->firm_id === $offer->user->firm_id;
        }
        return $user->id === $offer->user_id;
    }

    public function completeOffer(User $user, Offer $offer) {
        if($user->firm_id !== null) {
            return $user->firm_id === $offer->user->firm_id;
        }
        return $user->id === $offer->user_id;
    }

    public function restoreOffer(User $user, Offer $offer) {
        if($user->firm_id !== null) {
            return $user->firm_id === $offer->user->firm_id;
        }
        return $user->id === $offer->user_id;
    }
}
