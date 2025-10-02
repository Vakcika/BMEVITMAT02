<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductGemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'gem_id' => 'required|exists:gems,id',
            'count' => 'required|integer|min:1',
        ];
    }
}
