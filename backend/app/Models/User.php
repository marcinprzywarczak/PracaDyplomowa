<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'sure_name',
        'firm_id',
        'phone_number',
        'email',
        'password',
        'avatar',
        'avatar_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function firm()
    {
        return $this->belongsTo(Firm::class);
    }

    public function offers(){
        return $this->hasMany(Offer::class);
    }

    public function followOffers(){
        return $this->belongsToMany(Offer::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function messageHeadersSend(){
        return $this->hasMany(MessageHeader::class, 'sender');
    }

    public function messageHeadersReceived(){
        return $this->hasMany(MessageHeader::class, 'recipient');
    }
}
