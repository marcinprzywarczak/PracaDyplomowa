<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageHeaderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'sender' => $this->sender,
            'recipient' => $this->recipient,
            'offer_id' => $this->offer_id,
            'subject' => $this->subject,
            'unread_recipient_messages' => $this->getUnreadRecipientMessagesCount(),
            'unread_sender_messages' => $this->getUnreadSenderMessagesCount(),
            'sender_user' => $this->senderUser,
            'recipient_user' => $this->recipientUser,
            'offer' => $this->offer,
            'offer_photos' => $this->offer->photos,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
