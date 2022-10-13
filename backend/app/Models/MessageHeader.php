<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageHeader extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender',
        'recipient',
        'offer_id',
        'subject',
    ];

    public function senderUser(){
        return $this->belongsTo(User::class, 'sender');
    }

    public function recipientUser(){
        return $this->belongsTo(User::class, 'recipient');
    }

    public function offer(){
        return $this->belongsTo(Offer::class);
    }

    public function messages(){
        return $this->hasMany(Message::class);
    }

    public function getUnreadRecipientMessagesCount(){
        return $this->messages()->where('received', 0)
            ->where('is_from_sender', 1)->count();
    }

    public function getUnreadSenderMessagesCount(){
        return $this->messages()->where('received', 0)
            ->where('is_from_sender', 0)->count();
    }
}
