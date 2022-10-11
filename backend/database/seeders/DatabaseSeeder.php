<?php

namespace Database\Seeders;

use App\Models\Firm;
use App\Models\OfferStatus;
use App\Models\Parameter;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesSeeder::class);
        $this->call(PermissionsSeeder::class);
        Firm::create([
            'name' => 'test',
            'NIP' => '123 123 1',
            'REGON' => '222 22 2',
            'street' => 'kaliska',
            'number' => '33',
            'zip_code' => '62-800',
            'locality' => 'Kalisz',
            'logo_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'logo' => 'avatars/default_avatar.jpg'
        ]);
        $user = User::create([
            'first_name' => 'test',
            'sure_name' => 'test1',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test@test.com',
            'password' => Hash::make('12345678'),
            'avatar' => 'avatars/default_avatar.jpg',
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg'
        ]);
        $firmOwnerRole = Role::findByName(config('app.firm_owner_role'));
        if(isset($firmOwnerRole))
            $user->assignRole($firmOwnerRole);
        $user = User::create([
            'first_name' => 'User',
            'sure_name' => 'Testowy',
            'phone_number' => '+48 255 888 555',
            'email' => 'user@testowy.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);
        $userRole = Role::findByName(config('app.user_role'));
        if(isset($userRole))
            $user->assignRole($userRole);

        $this->call(PropertyTypesSeeder::class);
        $this->call(OfferStatusesSeeder::class);
        $this->call(OfferTypesSeeder::class);
        $this->call(OffersSeeder::class);
        $this->call(ParametersSeeder::class);
        $this->call(OfferParametersSeeder::class);
        $this->call(OfferPhotoSeeder::class);
        // \App\Models\User::factory(10)->create();
        $user = User::create([
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test1@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);
        $user = User::create([
            'first_name' => 'Jan',
            'sure_name' => 'Nowak',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test2@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);
        $user = User::create([
            'first_name' => 'Piotr',
            'sure_name' => 'Kowalski',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test3@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);
        $user = User::create([
            'first_name' => 'Paweł',
            'sure_name' => 'Paweł',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test4@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);
        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Nowicki',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test5@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);
        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Test',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test6@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);

        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Dwa',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test7@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);

        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Jeden',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test8@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);

        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Kowalski',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test9@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);

        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Nowak',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test10@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);

        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Nowak',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test11@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);

        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Nowak',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test12@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);

        $user = User::create([
            'first_name' => 'Andrzej',
            'sure_name' => 'Nowak',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test13@test.com',
            'password' => Hash::make('12345678'),
            'avatar_url' => 'http://localhost:8000/avatars/default_avatar.jpg',
            'avatar' => 'avatars/default_avatar.jpg'
        ]);
        $this->call(MessageSeeder::class);
    }
}
