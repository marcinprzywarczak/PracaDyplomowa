<?php

namespace App\Http\Controllers;

use App\Events\MessageHeaderSent;
use App\Events\MessageSent;
use App\Http\Requests\Messages\CreateMessageHeaderRequest;
use App\Http\Requests\Messages\GetMessagesForHeaderRequest;
use App\Http\Requests\Messages\ReplyMessageRequest;
use App\Http\Resources\MessageHeaderResource;
use App\Models\Message;
use App\Models\MessageHeader;
use App\Models\Offer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatsController extends Controller
{
    public function sendMessage(CreateMessageHeaderRequest $request)
    {
        $user = Auth::user();
        $toUser = User::findOrFail($request->input('user_message_to'));
        $offer = Offer::findOrFail($request->input('offer_id'));
        $messageHeader = DB::transaction(function () use ($request, $user, $toUser, $offer){
            $messageHeader = MessageHeader::create([
                'sender' => $user->id,
                'recipient' => $toUser->id,
                'offer_id' => $offer->id,
                'subject' => $request->subject,
            ]);
            $message = Message::create([
                'message_header_id' => $messageHeader->id,
                'message' => $request->input('message'),
                'received' => 0,
                'is_from_sender' => true
            ]);
            $messageHeader->load('senderUser', 'recipientUser', 'offer', 'offer.photos' ,'messages'); //do przetestowania
//            return MessageHeader::with('senderUser', 'recipientUser', 'offer', 'offer.photos' ,'messages')
//                ->where('id', $messageHeader->id)->first();
            return $messageHeader;
        });

        broadcast(new MessageHeaderSent($user, $messageHeader, $toUser));
        return ['status' => 'Message Sent!'];
    }

    public function getAllMessages(Request $request)
    {
        $messageHeaders = MessageHeader::with('senderUser', 'recipientUser', 'offer', 'offer.photos' ,'messages')
            ->where('recipient', Auth::id())->orWhere('sender', Auth::id())
            ->orderBy('updated_at', 'desc')->get();

        return response()->json([
            'messages' => MessageHeaderResource::collection($messageHeaders)
        ]);
    }

    public function getMessagesForMessageHeader(GetMessagesForHeaderRequest $request) {
        $messageHeaderId = $request->input('messageHeaderId');
        $messages = Message::where('message_header_id', $messageHeaderId)->orderBy('created_at', 'asc')->get();
        return response()->json([
            'messages' => $messages,
        ]);
    }

    public function replyMessage(ReplyMessageRequest $request) {
        $messageHeader = MessageHeader::findOrFail($request->input('messageHeaderId'));
        $authUserId = Auth::id();
        $isFromSender = $messageHeader->sender === $authUserId;
        $message = DB::transaction(function () use ($request, $messageHeader, $isFromSender){
            $messageHeader->updated_at = Carbon::now();
            $messageHeader->save();

            $message = Message::create([
                'message_header_id' => $messageHeader->id,
                'message' => $request->input('message'),
                'received' => 0,
                'is_from_sender' => $isFromSender
            ]);
            return $message;
        });

        if($isFromSender) {
            $toUser = User::findOrFail($messageHeader->recipient);
        } else {
            $toUser = User::findOrFail($messageHeader->sender);
        }
        broadcast(new MessageSent(Auth::user(), $message, $messageHeader ,$toUser));
        return response()->json(['message' => $message]);
    }

    public function setMessagesStatus(GetMessagesForHeaderRequest $request) {
        $messageHeaderId = $request->input('messageHeaderId');
        $messageHeader = MessageHeader::findOrFail($messageHeaderId);
        if($messageHeader->sender === Auth::id()){
            $isFromSender = 0;
        } else {
            $isFromSender = 1;
        }
        Message::where('message_header_id', $messageHeaderId)
            ->where('is_from_sender', $isFromSender)
            ->update(['received' => 1]);
    }
}
