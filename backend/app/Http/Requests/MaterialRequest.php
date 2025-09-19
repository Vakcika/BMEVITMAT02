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
            'customer_id' => 'required|exists:customers,id',
            'material_type' => 'required|string',
            'material_name' => 'required|string|max:255',
            'raw_casting_price' => 'required|numeric|min:0',
            'wrought_casting_price' => 'required|numeric|min:0',
            'raw_casting_loss' => 'required|numeric|min:0',
            'wrought_casting_loss' => 'required|numeric|min:0',
            'mark_price' => 'required|numeric|min:0',
            'trade_in_price' => 'required|numeric|min:0',
            'stub_placement_price' => 'required|numeric|min:0',
            'stub_removal_price' => 'required|numeric|min:0',
            'extra_charge' => 'nullable|numeric|min:0',
        ];
    }
}
