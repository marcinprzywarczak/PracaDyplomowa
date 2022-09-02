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
            'value' => 'wolnostojący'
        ]);
        DB::table('offer_parameter')->insert([
            'parameter_id' => 2,
            'offer_id' => 1,
            'value' => '3'
        ]);
        DB::table('offer_parameter')->insert([
            'parameter_id' => 3,
            'offer_id' => 1,
            'value' => 'cegła'
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 4,
            'offer_id' => 1,
            'value' => '2010'
        ]);


        DB::table('offer_parameter')->insert([
            'parameter_id' => 5,
            'offer_id' => 1,
            'value' => '1000'
        ]);


        DB::table('offer_parameter')->insert([
            'parameter_id' => 6,
            'offer_id' => 1,
            'value' => '8'
        ]);


        DB::table('offer_parameter')->insert([
            'parameter_id' => 9,
            'offer_id' => 1,
            'value' => 'blacha'
        ]);


        DB::table('offer_parameter')->insert([
            'parameter_id' => 10,
            'offer_id' => 1,
            'value' => 'do zamieszkania'
        ]);


        DB::table('offer_parameter')->insert([
            'parameter_id' => 12,
            'offer_id' => 1,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 13,
            'offer_id' => 1,
            'value' => ''
        ]);


        DB::table('offer_parameter')->insert([
            'parameter_id' => 21,
            'offer_id' => 1,
            'value' => ''
        ]);


        DB::table('offer_parameter')->insert([
            'parameter_id' => 27,
            'offer_id' => 1,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 39,
            'offer_id' => 1,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 3,
            'offer_id' => 3,
            'value' => 'pustak'
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 3,
            'offer_id' => 2,
            'value' => 'beton'
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 94,
            'offer_id' => 19,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 95,
            'offer_id' => 19,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 96,
            'offer_id' => 19,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 92,
            'offer_id' => 19,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 91,
            'offer_id' => 19,
            'value' => ''
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 83,
            'offer_id' => 19,
            'value' => 12
        ]);

        DB::table('offer_parameter')->insert([
            'parameter_id' => 82,
            'offer_id' => 19,
            'value' => 'blok'
        ]);
//        DB::table('offer_parameter')->insert([
//            'parameter_id' => 3,
//            'offer_id' => 2,
//            'value' => '8'
//        ]);
//        DB::table('offer_parameter')->insert([
//            'parameter_id' => 1,
//            'offer_id' => 2,
//            'value' => '5'
//        ]);
    }
}
