<?php

namespace App\Policies;

use App\Models\MessageHeader;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessageHeaderPolicy
{
    use HandlesAuthorization;

    public function getMessagesForMessageHeader(User $user, MessageHeader $messageHeader) {
        return ($messageHeader->sender === $user->id || $messageHeader->recipient === $user->id);
    }

    public function setMessagesStatus(User $user, MessageHeader $messageHeader) {
        return ($messageHeader->sender === $user->id || $messageHeader->recipient === $user->id);
    }

    public function replyMessage(User $user, MessageHeader $messageHeader) {
        return ($messageHeader->sender === $user->id || $messageHeader->recipient === $user->id);
    }

}
