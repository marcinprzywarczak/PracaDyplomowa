<?php

namespace Database\Seeders;

use App\Models\Parameter;
use App\Models\ParameterCategory;
use App\Models\ParameterValue;
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

        $parameter_category = ParameterCategory::create([
            'name' => 'informacje szczegółowe',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'rodzaj zabudowy',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
           'parameter_id' => $parameter->id,
           'value' => 'wolnostojący',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'bliźniak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'szeregowiec',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'kamienica',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'dworek/pałac',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'gospodarstwo',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'liczba pięter',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'materiał budynku',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'cegła',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'pustak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'keramzyt',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'drewno',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'beton',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'inne',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'rok budowy',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'powierzchnia działki',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'liczba pokoi',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'poddasze',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'brak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'użytkowe',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'nieużytkowe',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'dach',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'brak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'płaski',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'skośny',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'pokrycie dachu',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'blacha',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'dachówka',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'eternit',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'łupek',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'papa',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'strzecha',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'inne',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'stan wykończenia',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'do remontu',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'stan surowy otwarty',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'stan surowy zamknięty',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'do zamieszkania',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'do wykończenia',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'okna',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'brak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'plastikowe',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'drewniane',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'aluminiowe',
        ]);

        $parameter_category = ParameterCategory::create([
            'name' => 'zabezpieczenia budynku',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'rolety antywłamaniowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'monitoring',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'ochrona',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'drzwi antywłamaniowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'okna antywłamaniowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'system alarmowy',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'domofon',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'teren zamknięty',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter_category = ParameterCategory::create([
            'name' => 'ogrodzenie',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'murowane',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'siatka',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'metalowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'drewniane',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'betonowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'żywopłot',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'inne',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter_category = ParameterCategory::create([
            'name' => 'ogrzewanie',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'olejowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'elektryczne',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'miejskie',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'kominkowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'piec kaflowy',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'gazowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'węglowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'biomasa',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'pompa ciepła',
            'isAny' => false,
            'type' => 'boolean',
        ]);


        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'kolektor słoneczny',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'geotermika',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter_category = ParameterCategory::create([
            'name' => 'media',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'woda',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'prąd',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'kanalizacja',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'telefon',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'gaz',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'internet',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'szambo',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'oczyszczalnia przydomowa',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'telewizja kablowa',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter_category = ParameterCategory::create([
            'name' => 'informacje dodatkowe',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'piwnica',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'strych',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'garaż',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'basen',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'klimatyzacja',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 1,
            'name' => 'umeblowanie',
            'isAny' => false,
            'type' => 'boolean',
        ]);
        /*
         * Parametry dla mieszkania
         */
        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'rodzaj zabudowy',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'blok',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'kamienica',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'dom wolnostojący',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'szeregowiec',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'apartamentowiec',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'loft',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'liczba pięter',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'piętro',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'liczba pokoi',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'rok budowy',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'materiał budynku',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'cegła',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'drewno',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'pustak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'keramzyt',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'wielka płyta',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'inne',
        ]);


        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'poddasze',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'brak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'użytkowe',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'nieużytkowe',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'stan wykończenia',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'do remontu',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'do zamieszkania',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'do wykończenia',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'okna',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'plastikowe',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'drewniane',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'aluminiowe',
        ]);


        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'ogrzewanie',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'miejskie',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'gazowe',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'piec kaflowy',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'elektryczne',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'kotłownia',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'inne',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'czynsz',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 2,
            'name' => 'forma własności',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'spóldzielcze własnościowe',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'spóldzielcze własnościowe z KW',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'pełna własność',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'udział',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'rolety antywłamaniowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'monitoring',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'ochrona',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'drzwi antywłamaniowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'okna antywłamaniowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'system alarmowy',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'domofon',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 2,
            'property_type_id' => 2,
            'name' => 'teren zamknięty',
            'isAny' => false,
            'type' => 'boolean',
        ]);


        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'balkon',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'pomieszczenie użytkowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'garaż/miejsce parkingowe',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'piwnica',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'ogórdek',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'taras',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'winda',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'oddzielna kuchnia',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 2,
            'name' => 'klimatyzacja',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        /*
         * parametry dla kategorii pokój
         */

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 4,
            'name' => 'rodzaj zabudowy',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'blok',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'kamienica',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'dom wolnostojący',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'szeregowiec',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'apartamentowiec',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'loft',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 4,
            'name' => 'liczba pięter',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 4,
            'name' => 'piętro',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 4,
            'name' => 'kaucja',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 4,
            'name' => 'dodatkowe opłaty',
            'isAny' => true,
            'type' => 'int',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 4,
            'name' => 'liczba osób w pokoju',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'jednoosobowy',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'dwuosobowy',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'trzyosobowy lub więcej',
        ]);

        $parameter_category = ParameterCategory::create([
            'name' => 'wyposażenie',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 4,
            'name' => 'pralka',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 4,
            'name' => 'zmywarka',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 4,
            'name' => 'meble',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 4,
            'name' => 'lodówka',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 4,
            'name' => 'kuchenka',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 4,
            'name' => 'piekarnik',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 4,
            'name' => 'telewizor',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 4,
            'name' => 'internet',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 4,
            'name' => 'telefon',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 6,
            'property_type_id' => 4,
            'name' => 'telewizja kablowa',
            'isAny' => false,
            'type' => 'boolean',
        ]);


        /*
         * parametry szczegółowe dla kategorii działka
         */
        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 3,
            'name' => 'typ działki',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'budowlana',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'rolna',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'inwestycyjna',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'rekreacyjna',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'leśna',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'rolno-budowlana',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'inna',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 3,
            'name' => 'wymiary',
            'isAny' => true,
            'type' => 'string',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 1,
            'property_type_id' => 3,
            'name' => 'ogrodzenie',
            'isAny' => false,
            'type' => 'string',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'tak',
        ]);

        $parameter_value = ParameterValue::create([
            'parameter_id' => $parameter->id,
            'value' => 'nie',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 5,
            'property_type_id' => 3,
            'name' => 'woda',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 5,
            'property_type_id' => 3,
            'name' => 'prąd',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 5,
            'property_type_id' => 3,
            'name' => 'kanalizacja',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 5,
            'property_type_id' => 3,
            'name' => 'telefon',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 5,
            'property_type_id' => 3,
            'name' => 'gaz',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 5,
            'property_type_id' => 3,
            'name' => 'szambo',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => 5,
            'property_type_id' => 3,
            'name' => 'oczyszczalnia przydomowa',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter_category = ParameterCategory::create([
            'name' => 'dojazd',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 3,
            'name' => 'nieutwardzony',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 3,
            'name' => 'utwardzony',
            'isAny' => false,
            'type' => 'boolean',
        ]);

        $parameter = Parameter::create([
            'parameter_category_id' => $parameter_category->id,
            'property_type_id' => 3,
            'name' => 'asfaltowy',
            'isAny' => false,
            'type' => 'boolean',
        ]);

    }
}
