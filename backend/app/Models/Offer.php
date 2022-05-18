<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'property_type_id',
        'offer_status_id',
        'offer_type_id',
        'user_id',
        'title',
        'area_square_meters',
        'price',
        'locality',
        'description',
    ];

    public function property_type(){
        return $this->belongsTo(PropertyType::class);
    }

    public function offer_status(){
        return $this->belongsTo(OfferStatus::class);
    }

    public function offer_type(){
        return $this->belongsTo(OfferType::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function parameters(){
        return $this->belongsToMany(Parameter::class)
            ->withPivot('value')->using(OfferParameter::class);
    }


}
