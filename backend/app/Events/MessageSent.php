<?php

namespace App\Events;

use App\Models\Message;
use App\Models\MessageHeader;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User that sent the message
     *
     * @var User
     */
    public $user;

    /**
     * Message details
     *
     * @var Message
     */
    public $message;

    /**
     * Message user recipient
     *
     * @var User
     */
    public $toUser;

    /**
     * Message header
     *
     * @var MessageHeader
     */
    public $messageHeader;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user, Message $message, MessageHeader $messageHeader, User $toUser)
    {
        $this->user = $user;
        $this->message = $message;
        $this->toUser = $toUser;
        $this->messageHeader = $messageHeader;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */

    public function broadcastOn()
    {
        return new PrivateChannel('chat.'.$this->toUser->id);
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'message-sent';
    }
}
