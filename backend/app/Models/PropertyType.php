<?php

namespace App\Models;

use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyType extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
    ];

    public function offers(){
        return $this->hasMany(Offer::class);
    }
    public function parameters(){
        return $this->hasMany(Parameter::class);
    }
}
