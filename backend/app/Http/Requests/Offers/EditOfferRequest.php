<?php

namespace App\Http\Requests\Offers;

class EditOfferRequest extends \Illuminate\Foundation\Http\FormRequest
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
            'property_type_id' => ['required', 'integer', 'exists:property_types,id'],
            'offer_type_id' => ['required', 'integer', 'exists:offer_types,id'],
            'title' => ['required', 'min:10', 'max:255'],
            'files.*' => ['file'],
            'files' => ['array'],
            'area_square_meters' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'main_photo' => ['required_if:photo_changed,true', 'file'],
            'description' => ['required', 'min:20', 'max:1000'],
            'parameters.*.parameterId' => ['exists:parameters,id', 'integer'],
            'offer_id' => ['required', 'integer', 'exists:offers,id'],
            'photo_changed' => ['required', 'boolean'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(json_decode($this->editOffer, true, 512, JSON_THROW_ON_ERROR));
        $this->request->remove('editOffer');
    }

    public function attributes()
    {
        return
            [
                'title' => 'tytuł',
                'property_type_id' => 'typ nieruchomości',
                'offer_type_id' => 'typ oferty',
                'files.*' => 'zdjęcie',
                'files' => 'zdjęcia',
                'area_square_meters' => 'powierzchnia',
                'price' => 'cena',
                'main_photo' => 'zdjęcie główne',
                'description' => 'opis',
                'parameters.*.parameterId' => 'parametr'
            ];
    }
}
