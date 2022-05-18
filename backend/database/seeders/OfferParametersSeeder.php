<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfferParametersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('offer_parameter')->insert([
            'parameter_id' => 1,
            'offer_id' => 1,
            'value' => '5'
        ]);
        DB::table('offer_parameter')->insert([
            'parameter_id' => 2,
            'offer_id' => 1,
            'value' => '6'
        ]);
        DB::table('offer_parameter')->insert([
            'parameter_id' => 3,
            'offer_id' => 1,
            'value' => '7'
        ]);
        DB::table('offer_parameter')->insert([
            'parameter_id' => 3,
            'offer_id' => 2,
            'value' => '8'
        ]);
        DB::table('offer_parameter')->insert([
            'parameter_id' => 1,
            'offer_id' => 2,
            'value' => '5'
        ]);
    }
}
