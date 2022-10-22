<?php

namespace Database\Seeders;

use App\Models\Photo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OfferPhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $photo = Photo::create([
            'path' => 'public/1zdj1.jpg',
            'photo_url' => 'http://localhost:8000/public/1zdj1.jpg',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => true
        ]);

        $photo = Photo::create([
            'path' => 'public/1zdj2.jpg',
            'photo_url' => 'http://localhost:8000/public/1zdj2.jpg',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        $photo = Photo::create([
            'path' => 'public/1zdj3.jpg',
            'photo_url' => 'http://localhost:8000/public/1zdj3.jpg',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        $photo = Photo::create([
            'path' => 'public/1zdj4.jpg',
            'photo_url' => 'http://localhost:8000/public/1zdj4.jpg',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        $photo = Photo::create([
            'path' => 'public/1zdj5.jpg',
            'photo_url' => 'http://localhost:8000/public/1zdj5.jpg',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);
    }
}
