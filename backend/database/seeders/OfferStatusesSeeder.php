<?php

namespace Database\Seeders;

use App\Models\OfferStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfferStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OfferStatus::create([
            'name' => 'aktywne'
        ]);

        OfferStatus::create([
            'name' => 'zakończone'
        ]);

        OfferStatus::create([
            'name' => 'usunięte'
        ]);

        OfferStatus::create([
            'name' => 'wstrzymane'
        ]);
    }
}
