<?php

namespace Database\Factories;

use App\Models\OfferType;
use App\Models\PropertyType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'property_type_id' => PropertyType::select('id')->orderByRaw("RAND()")->first()->id,
            'offer_status_id' => 1,
            'offer_type_id' => OfferType::select('id')->orderByRaw("RAND()")->first()->id,
            'user_id' => User::select('id')->orderByRaw("RAND()")->first()->id,
            'title' => $this->faker->text(10),
            'area_square_meters' => $this->faker->numberBetween(50, 200),
            'price' => $this->faker->numberBetween(50000, 300000),
            'locality' => $this->faker->word(),
            'description' => $this->faker->text(300),
        ];
    }
}
