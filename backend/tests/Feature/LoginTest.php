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

class LoginTest extends TestCase
{
    use DatabaseTransactions;

    //Pomyślne logowanie
    public function test_login_success()
    {
        $response =  $this->postJson('/login', [
            'email' => 'user@testowy.com',
            'password' => '12345678'
        ]);
        $this->assertAuthenticated();
        $response->assertStatus(200);
    }

    //Błąd podczas logowania
    public function test_login_failed()
    {
        $response = $this->postJson('/login', [
            'email' => 'user@testowy.com',
            'password' => '1234a5678'
        ]);

        $response->assertJson(["message" => "Wprowadzono niepoprawne dane logowania"]);
        $response->assertStatus(422);
    }

    //Próba pobrania danych, która wymaga autoryzacji zakończona niepowodzeniem
    public function test_unauthorized_request() {
        $offer = Offer::first();
        $response = $this->postJson('/api/offers/getOfferToEdit', ["id" => $offer->id]);
        $response->assertJson(["message" => "Unauthenticated."]);
        $response->assertStatus(401);
    }

    //Pobranie danych, które wymaga autoryzacji
    public function test_authorized_request() {
        Sanctum::actingAs(User::first());
        $offer = Offer::first();
        $response = $this->postJson('/api/offers/getOfferToEdit', ["id" => $offer->id]);
        $response->assertStatus(200);
    }
}
