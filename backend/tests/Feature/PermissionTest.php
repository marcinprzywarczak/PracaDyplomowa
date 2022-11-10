<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PermissionTest extends TestCase
{
    use DatabaseTransactions;

    //Użytkownik nie może pobrać ogłoszenia do edycji, którego nie jest autorem
    public function test_forbidden_get_offer_to_edit() {
        Sanctum::actingAs(User::first());
        $offer = Offer::where('user_id', 2)->first();
        $response = $this->postJson('/api/offers/getOfferToEdit', ["id" => $offer->id]);
        $response->assertStatus(403);
        $response->assertJson(["message" => "This action is unauthorized."]);
    }

    //Użytkownik może pobrać ogłoszenie do edycji, którego jest autorem
    public function test_success_get_offer_to_edit() {
        Sanctum::actingAs(User::first());
        $offer = Offer::where('user_id', 1)->first();
        $response = $this->postJson('/api/offers/getOfferToEdit', ["id" => $offer->id]);
        $response->assertStatus(200);
    }

    //Użytkownik może pobrać ogłoszenie do edycji, którego autorem jest inny użytkownik będący pracownikiem tej samej firmy
    public function test_success_get_offer_to_edit_another_employee() {
        $user = User::first();
        Sanctum::actingAs($user);
        $offer = Offer::with('user')
            ->whereHas('user', function (Builder $query) use ($user) {
                $query->where('firm_id', $user->firm_id);
        })->where('user_id', '<>',$user->id)->first();
        $response = $this->postJson('/api/offers/getOfferToEdit', ["id" => $offer->id]);
        $response->assertStatus(200);
    }

    //Użytkownik nie może edytować ogłoszenia, którego nie jest autorem
    public function test_forbidden_edit_offer() {
        $user = User::first();
        $offer = Offer::create([
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);

        $user2 = User::whereNull('firm_id')->where('id', '<>', $user->id)->first();
        Sanctum::actingAs($user2);
        $response = $this->postJson('/api/offers/update',
            [
                'editOffer' => json_encode([
                    'property_type_id' => 1,
                    'offer_status_id' => 1,
                    'offer_type_id' => 2,
                    'title' => 'Oferta nr 1 edycja',
                    'area_square_meters' => 120,
                    'price' => 120000,
                    'locality' => 'Test',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
                    'photo_changed' => false,
                    'offer_id' => $offer->id
                ]),
                'parameters' => [],
            ]);
        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);
        $response->assertJson(["message" => "This action is unauthorized."]);
        $response->assertStatus(403);
    }

    //Użytkownik może edytować ogłoszenie, którego jest autorem
    public function test_success_edit_offer() {
        $user = User::first();
        $offer = Offer::create([
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);

        Sanctum::actingAs($user);
        $response = $this->postJson('/api/offers/update',
            [
                'editOffer' => json_encode([
                    'property_type_id' => 1,
                    'offer_status_id' => 1,
                    'offer_type_id' => 2,
                    'title' => 'Oferta nr 1 edycja',
                    'area_square_meters' => 120,
                    'price' => 120000,
                    'locality' => 'Test',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
                    'photo_changed' => false,
                    'offer_id' => $offer->id
                ]),
                'parameters' => [],
            ]);
        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1 edycja',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);
        $response->assertStatus(200);
    }

    //Użytkownik może edytować ogłoszenie, którego autorem jest inny pracownik tej samej firmy
    public function test_success_edit_offer_another_employee() {
        $user = User::first();
        $offer = Offer::create([
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);
        $user2 = User::where('firm_id', $user->firm_id)->where('id', '<>', $user->id)->first();
        Sanctum::actingAs($user2);
        $response = $this->postJson('/api/offers/update',
            [
                'editOffer' => json_encode([
                    'property_type_id' => 1,
                    'offer_status_id' => 1,
                    'offer_type_id' => 2,
                    'title' => 'Oferta nr 1 edycja',
                    'area_square_meters' => 120,
                    'price' => 120000,
                    'locality' => 'Test',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
                    'photo_changed' => false,
                    'offer_id' => $offer->id
                ]),
                'parameters' => [],
            ]);
        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1 edycja',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);
        $response->assertStatus(200);
    }

    //Użytkownik nie może pobierać pracowników firmy, jeśli nie ma odpowiednich uprawnień
    public function test_forbidden_get_firm_users() {
        $user = User::whereNull('firm_id')->first();
        Sanctum::actingAs($user);
        $response = $this->postJson('/api/users/getUsers',[
            'filters' => [
                'globalFilter' => '',
                'sortOrder' => 1,
                'sortField' => 'id',
                'first' => 0,
                'rows' => 10,
            ],
        ]);
        $response->assertJson(["message" => "This action is unauthorized."]);
        $response->assertStatus(403);
    }

    //Użytkownik o odpowiednich uprawnieniach może wyświetlać pracowników firmy
    public function test_success_get_firm_users() {
        $user = User::permission('users.index')->first();
        Sanctum::actingAs($user);
        $response = $this->postJson('/api/users/getUsers',[
            'filters' => [
                'globalFilter' => '',
                'sortOrder' => 1,
                'sortField' => 'id',
                'first' => 0,
                'rows' => 10,
            ],
        ]);
        $response->assertStatus(200);
    }
}
