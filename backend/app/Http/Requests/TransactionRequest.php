<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'order_id' => 'sometimes|exists:orders,id',
            'amount' => 'required|numeric',
            'note' => 'nullable|string',
        ];
    }
}
