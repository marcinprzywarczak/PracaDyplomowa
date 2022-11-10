<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_new_property_type_can_be_add()
    {
        $response = $this->post('/login', [
            'email' => 'user@testowy.com',
            'password' => '12345678'
        ]);

        $response->assertStatus(200);
    }
}
