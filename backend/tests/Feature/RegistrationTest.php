<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use DatabaseTransactions;

    //Użytkownik pomyślnie dokonał rejestracji (użytkownik indywidualny)
    public function test_success_registration()
    {
        $response =  $this->postJson('/register', [
            'isFirmAccount' => false,
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
            'password' => '12345678',
            'password_confirmation' => '12345678',
        ]);
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
        ]);
        $response->assertStatus(200);
    }

    //Użytkownik nie został zarejestrowany, poprzez błędne dane wejściowe
    public function test_failed_registration()
    {
        $response =  $this->postJson('/register', [
            'isFirmAccount' => false,
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
            'password' => '12345678',
            'password_confirmation' => '123456718',
        ]);
        $this->assertDatabaseMissing('users', [
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
        ]);
        $response->assertStatus(422);
    }

    //Użytkownik pomyślnie dokonał rejestracji (użytkownik firmowy)
    public function test_success_registration_firm()
    {
        $response =  $this->postJson('/register', [
            'isFirmAccount' => 'true',
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
            'password' => '12345678',
            'password_confirmation' => '12345678',
            'firm_name' => 'Firma przykladowa',
            'nip' => '123-123-123',
            'regon' => '123-22-123',
            'street' => 'Test',
            'number' => '12',
            'locality' => 'Test',
            'zip_code' => '12-121',
        ]);
        $this->assertAuthenticated();

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
        ]);
        $this->assertDatabaseHas('firms', [
            'name' => 'Firma przykladowa',
            'nip' => '123-123-123',
            'regon' => '123-22-123',
            'street' => 'Test',
            'number' => '12',
            'locality' => 'Test',
            'zip_code' => '12-121',
        ]);


    }


    //Użytkownik nie został zarejestrowany, poprzez błędne dane wejściowe (użytkownik firmowy)
    public function test_failed_registration_firm()
    {
        $response =  $this->postJson('/register', [
            'isFirmAccount' => 'true',
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
            'password' => '12345678',
            'password_confirmation' => '123145678',
            'firm_name' => 'Firma przykladowa',
            'nip' => '123-123-123',
            'regon' => '123-22-123',
            'street' => 'Test',
            'number' => '12',
            'locality' => 'Test',
            'zip_code' => '12-121',
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('users', [
            'email' => 'jan@kowalski-test.com',
            'first_name' => 'Jan',
            'sure_name' => 'Kowalski',
            'phone_number' => '123 123 123',
        ]);
        $this->assertDatabaseMissing('firms', [
            'name' => 'Firma przykladowa',
            'nip' => '123-123-123',
            'regon' => '123-22-123',
            'street' => 'Test',
            'number' => '12',
            'locality' => 'Test',
            'zip_code' => '12-121',
        ]);


    }

}
