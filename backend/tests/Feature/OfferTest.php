<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\OfferStatus;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OfferTest extends TestCase
{
    use DatabaseTransactions;

    //Ogłoszenie pomyślnie dodane.
    public function test_add_offer_success()
    {
        $user = User::first();
        Sanctum::actingAs($user);
        $stub = __DIR__.'/test_files/test.jpg';
        $name = 'test.jpg';
        $file = new UploadedFile($stub, $name, 'image/png', null, true);

        $response = $this->postJson('/api/offers/store',
            [
                'main_photo' => $file,
                'addOffer' => json_encode([
                    'property_type_id' => 1,
                    'offer_status_id' => 1,
                    'offer_type_id' => 2,
                    'title' => 'Oferta nr 1 TEST',
                    'area_square_meters' => 120,
                    'price' => 120000,
                    'locality' => 'Test',
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
                ]),
                'parameters' => [],
            ]);

        $response->assertStatus(200);

        $photo = Photo::with('offers')->whereHas('offers',
            function (Builder $query) use ($response) {
                $query->where('offer_id', json_decode($response->getContent())->offer_id);
        })->first();

        $this->assertDatabaseHas('offers', [
            'id' => json_decode($response->getContent())->offer_id,
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'title' => 'Oferta nr 1 TEST',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);

        $this->assertDatabaseHas('photos', [
            'path' => $photo->path
        ]);

        Storage::delete($photo->path);


    }

    //Błąd walidacji podczas dodawania ogłoszenia.
    public function test_add_offer_failed()
    {
        $user = User::first();
        Sanctum::actingAs($user);
        $stub = __DIR__.'/test_files/test.jpg';
        $name = 'test.jpg';
        $file = new UploadedFile($stub, $name, 'image/png', null, true);

        $response = $this->postJson('/api/offers/store',
            [
                'main_photo' => $file,
                'addOffer' => json_encode([
                    'property_type_id' => 1,
                    'offer_status_id' => 1,
                    'offer_type_id' => 2,
                    'title' => 'Oferta nr 1 test',
                    'area_square_meters' => 120,
                    'price' => 120000,
                    'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
                ]),
                'parameters' => [],
            ]);

        $response->assertStatus(422);


        $this->assertDatabaseMissing('offers', [
            'property_type_id' => 1,
            'offer_status_id' => 1,
            'offer_type_id' => 2,
            'title' => 'Oferta nr 1 test',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);

    }

    //pomyślna edycja ogłoszenia.
    public function test_update_offer_success()
    {
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

    //Błąd walidacji podczas edycji ogłoszenia.
    public function test_update_offer_failed()
    {
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

        $this->assertDatabaseMissing('offers', [
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
        $response->assertStatus(422);
    }


    //Pomyślne zakończenie ogłoszenia.
    public function test_complete_offer_success()
    {
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
        $response = $this->postJson('/api/offers/completeOffer',
            [
                'offerId' => $offer->id,
            ]);

        $offerStatus = OfferStatus::where('name', 'zakończone')->firstOrFail();

        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'property_type_id' => 1,
            'offer_status_id' => $offerStatus->id,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);

        $this->assertDatabaseMissing('offers', [
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
        $response->assertStatus(200);
    }

    //Pomyślne przywrócenie ogłoszenia.
    public function test_restore_offer_success()
    {
        $user = User::first();

        $offerStatusComplete = OfferStatus::where('name', 'zakończone')->firstOrFail();

        $offer = Offer::create([
            'property_type_id' => 1,
            'offer_status_id' => $offerStatusComplete->id,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);

        Sanctum::actingAs($user);
        $response = $this->postJson('/api/offers/restoreOffer',
            [
                'offerId' => $offer->id,
            ]);

        $offerStatusActive = OfferStatus::where('name', 'aktywne')->firstOrFail();

        $this->assertDatabaseHas('offers', [
            'id' => $offer->id,
            'property_type_id' => 1,
            'offer_status_id' => $offerStatusActive->id,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);

        $this->assertDatabaseMissing('offers', [
            'id' => $offer->id,
            'property_type_id' => 1,
            'offer_status_id' => $offerStatusComplete->id,
            'offer_type_id' => 2,
            'user_id' => $user->id,
            'title' => 'Oferta nr 1',
            'area_square_meters' => 120,
            'price' => 120000,
            'locality' => 'Test',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet blandit varius.',
        ]);
        $response->assertStatus(200);
    }
}
