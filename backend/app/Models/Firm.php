<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Firm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'NIP',
        'REGON',
        'street',
        'number',
        'zip_code',
        'locality',
        'logo',
        'logo_url',
    ];

    public function users(){
        return $this->hasMany(User::class);
    }
}
