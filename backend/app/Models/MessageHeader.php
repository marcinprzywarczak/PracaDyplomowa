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
}
