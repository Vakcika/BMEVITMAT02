<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CastRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'order_id' => 'required|exists:orders,id',
            'material_id' => 'required|exists:materials,id',
            'amount' => 'required|integer|min:1',
            'amount_successful' => 'nullable|integer|min:0',
            'wrought' => 'boolean',
            'reserved' => 'boolean',
            'marked' => 'boolean',
            'comment' => 'nullable|string|max:255',
        ];
    }
}
