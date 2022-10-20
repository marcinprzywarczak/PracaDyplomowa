<?php

namespace App\Http\Requests\Messages;

use Illuminate\Foundation\Http\FormRequest;

class ReplyMessageRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'messageHeaderId' => ['integer', 'required', 'exists:message_headers,id'],
            'message' => ['string', 'required'],
        ];
    }

    public function attributes()
    {
        return
            [
                'message_header_id' => 'nagłówek wiadomości',
                'message' => 'wiadomość'
            ];
    }
}
