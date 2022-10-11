<?php

namespace Database\Seeders;

use App\Models\PropertyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PropertyType::create([
            'name' => 'dom'
        ]);

        PropertyType::create([
            'name' => 'mieszkanie'
        ]);

        PropertyType::create([
            'name' => 'działka'
        ]);

        PropertyType::create([
            'name' => 'pokój'
        ]);

    }

}
