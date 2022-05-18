<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\Pivot;

class OfferParameter extends Pivot
{
//    protected $casts = [
//        'value' => 'integer',
//    ];

    protected function value():Attribute{

        return Attribute::make(
            get: fn ($value, $attributes) => $value,//dd(Parameter::where('id',$attributes['parameter_id'])->first()->type),
        );
    }
    public function parameter(){
        return $this->belongsTo(Parameter::class);
    }
//    public function getParam(){
//        return $this->parameter->type;
//    }
}
