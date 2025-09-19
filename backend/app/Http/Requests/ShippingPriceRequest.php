<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingPriceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'price' => 'required|numeric|min:0',
        ];
    }
}
