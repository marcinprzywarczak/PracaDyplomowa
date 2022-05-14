<?php

namespace Database\Seeders;

use App\Models\OfferType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfferTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OfferType::create([
            'name' => 'sprzedaż'
        ]);
        OfferType::create([
            'name' => 'wynajem'
        ]);
    }
}
