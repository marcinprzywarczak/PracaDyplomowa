<?php

namespace Database\Seeders;

use App\Models\Firm;
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
            'logo' => 'http://localhost:8000/avatars/default_avatar.jpg'
        ]);
        $user = User::create([
            'first_name' => 'test',
            'sure_name' => 'test1',
            'firm_id' => 1,
            'phone_number' => '+48 655 888 555',
            'email' => 'test@test.com',
            'password' => Hash::make('12345678')
        ]);
        $firmOwnerRole = Role::findByName(config('app.firm_owner_role'));
        if(isset($firmOwnerRole))
            $user->assignRole($firmOwnerRole);
        $user = User::create([
            'first_name' => 'User',
            'sure_name' => 'Testowy',
            'phone_number' => '+48 255 888 555',
            'email' => 'user@testowy.com',
            'password' => Hash::make('12345678')
        ]);
        $userRole = Role::findByName(config('app.user_role'));
        if(isset($userRole))
            $user->assignRole($userRole);

        // \App\Models\User::factory(10)->create();
    }
}
