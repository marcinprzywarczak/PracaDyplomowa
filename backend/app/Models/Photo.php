<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'photo_url',
        'description'
    ];

    public function offers(){
        return $this->belongsToMany(Offer::class)
            ->withPivot('isMain');
    }
}
