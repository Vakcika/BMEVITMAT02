<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaterialHistoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'material_id' => 'required|exists:materials,id',
            'order_id' => 'sometimes|nullable|exists:orders,id',
            'amount' => 'required|numeric',
            'notes' => 'nullable|string',
        ];
    }
}
