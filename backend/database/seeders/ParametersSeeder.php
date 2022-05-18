<?php

namespace Database\Seeders;

use App\Models\Parameter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParametersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Parameter::create([
            'property_type_id' => 1,
            'name' => 'liczbaOkien',
            'isAny' => false,
            'type' => 'int',
        ]);

        Parameter::create([
            'property_type_id' => 1,
            'name' => 'liczbaDrzwi',
            'isAny' => false,
            'type' => 'int',
        ]);

        Parameter::create([
            'property_type_id' => 1,
            'name' => 'liczbaPokoi',
            'isAny' => false,
            'type' => 'int',
        ]);
    }
}
