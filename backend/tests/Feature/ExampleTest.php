<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        $this->runDatabaseMigrations();
        $this->seed();
    }

    public function test_login()
    {
        $this->post('/login', [
            'email' => 'user@testowy.com',
            'password' => '12345as678'
        ]);
        $this->assertAuthenticated();
Sanctum::actingAs(User::first());
        $offer = Offer::where('user_id', 1)->first();
        $response = $this->postJson('/api/offers/getOfferToEdit', ["id" => $offer->id]);
//
        $response->assertStatus(200);
    }
    public function test_login2()
    {

        $response = $this->postJson('/api/offers/getOfferToEdit', ["id" => 1]);

        $response->assertStatus(200);
    }
}
