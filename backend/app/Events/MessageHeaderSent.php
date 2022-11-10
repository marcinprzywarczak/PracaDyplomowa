<?php

namespace App\Events;

use App\Http\Resources\MessageHeaderResource;
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

class MessageHeaderSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User that sent the message
     *
     * @var User
     */
    public $user;


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
    public function __construct(
        User $user,
        MessageHeader $messageHeader,
        User $toUser)
    {
        $this->user = $user;
        $this->toUser = $toUser;
        $this->messageHeader =
            new MessageHeaderResource($messageHeader);
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
        return 'message-header-sent';
    }
}
