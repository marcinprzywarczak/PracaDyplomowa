<?php

namespace App\Http\Requests\User;

use App\Actions\Fortify\PasswordValidationRules;
use App\Models\User;
use Illuminate\Validation\Rule;

class IndexFirmUserRequest extends \Illuminate\Foundation\Http\FormRequest
{
    use PasswordValidationRules;

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
            'filters' => ['required', 'array'],
            'filters.globalFilter' => ['nullable','string'],
            'filters.sortOrder' => ['required', 'integer'],
            'filters.sortField' => ['required', 'string'],
            'filters.first' => ['required', 'integer'],
            'filters.rows' => ['required', 'integer'],
        ];
    }

}
