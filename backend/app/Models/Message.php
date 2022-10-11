<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'message',
        'message_header_id',
        'received',
        'is_from_sender'
    ];
    use HasFactory;

    public function messageHeader()
    {
        return $this->belongsTo(User::class);
    }
}
