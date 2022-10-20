<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFirmRequest extends FormRequest
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
            'firm_id' => ['required', 'exists:firms,id'],
            'name' => ['required', 'string', 'max:255'],
            'NIP' => ['required', 'string'],
            'REGON' => ['required', 'string'],
            'street' => ['nullable'],
            'number' => ['required', 'string'],
            'zip_code' => ['required', 'string', 'regex:/^(\d){2}\-(\d){3}$/'],
            'locality' => ['required', 'string'],
            'firm_logo' => ['nullable', 'image'],
        ];
    }
}
