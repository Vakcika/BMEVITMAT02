<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:product_categories,id',
            'gem_id' => 'nullable|exists:gems,id',
            'gem_count' => 'nullable|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'size' => 'nullable|string|max:255',
            'img_url' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ];
    }
}
