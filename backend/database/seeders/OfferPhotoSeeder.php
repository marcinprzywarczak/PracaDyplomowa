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
            'path' => 'avatars/1zdj1.png',
            'photo_url' => 'http://localhost:8000/avatars/1zdj1.png',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => true
        ]);

        $photo = Photo::create([
            'path' => 'avatars/1zdj2.png',
            'photo_url' => 'http://localhost:8000/avatars/1zdj2.png',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        $photo = Photo::create([
            'path' => 'avatars/1zdj3.png',
            'photo_url' => 'http://localhost:8000/avatars/1zdj3.png',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        $photo = Photo::create([
            'path' => 'avatars/DbWY97v72y55kI5vzEZGeXg8OvzQyquKtn9uVqcr.jpg',
            'photo_url' => 'http://localhost:8000/avatars/DbWY97v72y55kI5vzEZGeXg8OvzQyquKtn9uVqcr.jpg',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);

        $photo = Photo::create([
            'path' => 'avatars/1zdj4.png',
            'photo_url' => 'http://localhost:8000/avatars/1zdj4.png',
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
            'path' => 'avatars/1zdj5.png',
            'photo_url' => 'http://localhost:8000/avatars/1zdj5.png',
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
            'path' => 'avatars/default_avatar.png',
            'photo_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'description' => 'zdjecie'
        ]);

        DB::table('offer_photo')->insert([
            'photo_id' => $photo->id,
            'offer_id' => 1,
            'isMain' => false
        ]);
    }
}
