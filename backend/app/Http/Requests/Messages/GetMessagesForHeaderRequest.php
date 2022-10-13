<?php

namespace App\Http\Requests\Messages;

use Illuminate\Foundation\Http\FormRequest;

class GetMessagesForHeaderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
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
            'messageHeaderId' => ['integer', 'required', 'exists:message_headers,id']
        ];
    }

    public function attributes()
    {
        return
            [
                'messageHeaderId' => 'nagłówek wiadomości',
            ];
    }
}
