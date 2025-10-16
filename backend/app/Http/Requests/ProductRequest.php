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
            'name' => 'required|string|max:55',
            'category_id' => 'required|exists:product_categories,id',
            'weight' => 'required|numeric|min:0',
            'size' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'gems' => 'array',
            'gems.*.id' => 'required|exists:gems,id',
            'gems.*.count' => 'required|integer|min:1',
        ];
    }
}
