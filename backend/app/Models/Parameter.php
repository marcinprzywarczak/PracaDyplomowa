<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parameter extends Model
{
    use HasFactory;

    protected $fillable = [
        'parameter_category_id',
        'property_type_id',
        'name',
        'isAny',
        'type',
    ];

    public function property_type(){
        return $this->belongsTo(PropertyType::class);
    }

    public function parameter_category(){
        return $this->belongsTo(ParameterCategory::class);
    }

    public function parameter_values(){
        return $this->hasMany(ParameterValue::class);
    }

    public function offers(){
        return $this->belongsToMany(Offer::class)
            ->withPivot('value')->using(OfferParameter::class);
    }

    public function offer_parameters(){
        return $this->hasMany(OfferParameter::class);
    }
}
