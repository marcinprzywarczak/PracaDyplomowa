<?php

namespace Database\Seeders;

use App\Models\Offer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OffersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Offer::create([
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 1,
            'user_id' => 1,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Kalisz',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.
            Nulla pharetra justo ut massa egestas, quis pharetra quam fermentum. Aenean et ante magna. Cras quis
            malesuada eros, ac commodo quam. In tincidunt a nibh cursus dictum. Ut felis ex, congue iaculis risus
            eu, porttitor cursus risus. Sed consectetur pharetra risus, in convallis ante congue eu. In maximus nisi
             sit amet elementum laoreet.
            Maecenas sit amet aliquet nunc. Sed eu molestie arcu. Proin tristique ante vitae augue molestie ornare.
            Sed viverra ligula lacus, vel tristique tortor mollis eget. Aliquam at quam imperdiet, mattis libero laoreet,
             auctor lacus. Sed ac felis pretium mauris hendrerit blandit. Mauris urna ex, efficitur non ligula ac, dapibus
             pulvinar mauris.',
        ]);

        Offer::create([
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 1,
            'user_id' => 2,
            'title' => 'Oferta nr 2',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Kalisz',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.
            Nulla pharetra justo ut massa egestas, quis pharetra quam fermentum. Aenean et ante magna. Cras quis
            malesuada eros, ac commodo quam. In tincidunt a nibh cursus dictum. Ut felis ex, congue iaculis risus
            eu, porttitor cursus risus. Sed consectetur pharetra risus, in convallis ante congue eu. In maximus nisi
             sit amet elementum laoreet.
            Maecenas sit amet aliquet nunc. Sed eu molestie arcu. Proin tristique ante vitae augue molestie ornare.
            Sed viverra ligula lacus, vel tristique tortor mollis eget. Aliquam at quam imperdiet, mattis libero laoreet,
             auctor lacus. Sed ac felis pretium mauris hendrerit blandit. Mauris urna ex, efficitur non ligula ac, dapibus
             pulvinar mauris.',
        ]);

        Offer::create([
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 1,
            'user_id' => 2,
            'title' => 'Oferta nr 3',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Kalisz',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.
            Nulla pharetra justo ut massa egestas, quis pharetra quam fermentum. Aenean et ante magna. Cras quis
            malesuada eros, ac commodo quam. In tincidunt a nibh cursus dictum. Ut felis ex, congue iaculis risus
            eu, porttitor cursus risus. Sed consectetur pharetra risus, in convallis ante congue eu. In maximus nisi
             sit amet elementum laoreet.
            Maecenas sit amet aliquet nunc. Sed eu molestie arcu. Proin tristique ante vitae augue molestie ornare.
            Sed viverra ligula lacus, vel tristique tortor mollis eget. Aliquam at quam imperdiet, mattis libero laoreet,
             auctor lacus. Sed ac felis pretium mauris hendrerit blandit. Mauris urna ex, efficitur non ligula ac, dapibus
             pulvinar mauris.',
        ]);

        Offer::factory()->count(300)->create();
    }
}