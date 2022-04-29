<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesSeeder extends Seeder
{
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $firm_owner = Role::create(['name' => config('app.firm_owner_role')]);
        $employee = Role::create(['name' => config('app.employee_role')]);
        $user = Role::create(['name' => config('app.user_role')]);
    }
}
