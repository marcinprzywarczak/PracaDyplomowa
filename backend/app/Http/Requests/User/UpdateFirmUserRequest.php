<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFirmUserRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'first_name' => ['required', 'string', 'max:255'],
            'sure_name' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'regex:/^(\+\d{2}|0)\ (\d{3} \d{3} \d{3})$/'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user_id),
            ],
            'user_avatar' => ['nullable', 'image'],
        ];
    }
}
