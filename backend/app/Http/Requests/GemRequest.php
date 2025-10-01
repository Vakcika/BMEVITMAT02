<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'size' => 'required|string|max:255',
            'color_id' => 'required|exists:gem_colors,id',
            'shape_id' => 'required|exists:gem_shapes,id',
            'price' => 'required|numeric|min:0',
            'booking_price' => 'nullable|numeric|min:0',
        ];
    }
}
