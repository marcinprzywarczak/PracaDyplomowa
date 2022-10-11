<?php

namespace Database\Seeders;

use App\Models\MessageHeader;
use App\Models\User;
use http\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $messageHeader = MessageHeader::create([
            'sender' => 1,
            'recipient' => 2,
            'offer_id' => 1,
            'subject' => 'Test 123',
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 1',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => true
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 2',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => false
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 3',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => false
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 4',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => true
        ]);

        $messageHeader = MessageHeader::create([
            'sender' => 1,
            'recipient' => 2,
            'offer_id' => 1,
            'subject' => 'Test 111',
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 1',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => true
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 2',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => false
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 3',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => false
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 4',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => true
        ]);

        $messageHeader = MessageHeader::create([
            'sender' => 1,
            'recipient' => 2,
            'offer_id' => 1,
            'subject' => 'Test 111131',
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 1',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => true
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 2',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => false
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 3',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => false
        ]);

        $message = \App\Models\Message::create([
            'message' => 'Czesc to jest wiadomosc 4',
            'message_header_id' => $messageHeader->id,
            'received' => true,
            'is_from_sender' => true
        ]);
    }
}
