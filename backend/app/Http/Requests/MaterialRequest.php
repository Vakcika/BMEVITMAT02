<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id' => 'nullable|sometimes|exists:customers,id',
            'customer_id' => 'nullable|sometimes|exists:customers,id',
            'type' => 'required|in:9K,14K,18K,999,SILVER,BRONZE',
            'name' => 'required|string|max:55',
            'raw_casting_price' => 'required|numeric|min:0',
            'wrought_casting_price' => 'required|numeric|min:0',
            'raw_casting_loss' => 'required|numeric|min:0',
            'wrought_casting_loss' => 'required|numeric|min:0',
            'mark_price' => 'required|numeric|min:0',
            'trade_in_price' => 'required|numeric|min:0',
            'stub_placement_price' => 'required|numeric|min:0',
            'stub_removal_price' => 'required|numeric|min:0',
            'extra_charge' => 'required|numeric|min:0',
        ];
    }
}
