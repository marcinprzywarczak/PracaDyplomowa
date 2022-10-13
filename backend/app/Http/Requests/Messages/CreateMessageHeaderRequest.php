<?php

namespace App\Http\Requests\Messages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateMessageHeaderRequest extends FormRequest
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
        $authId = Auth::id();
        return [
            'user_message_to' =>
                [
                    'required', 'integer', 'exists:users,id',
                    function($attribute, $value, $fail) use($authId) {
                        if($authId == $this->input('user_message_to')) {
                            return $fail('Nie możesz wysłać wiadomości do siebie');
                        }
                    }
                ],
            'offer_id' => ['required', 'integer', 'exists:offers,id'],
            'message' => ['required', 'string'],
            'subject' => ['required', 'string'],
        ];
    }

    public function attributes()
    {
        return
            [
                'user_message_to' => 'nadawca',
                'offer_id' => 'oferta',
                'message' => 'wiadomość',
                'subject' => 'temat',
            ];
    }

    public function messages()
    {
        return [

        ];
    }
}
