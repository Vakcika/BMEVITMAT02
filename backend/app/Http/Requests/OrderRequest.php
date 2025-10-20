<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'shipping_price_id' => 'required|exists:shipping_prices,id',
            "products" => [
                "required",
                "array"
            ],
            "products.*.ordered_product_id" => [
                "required"
            ],
            "products.*.material_id" => [
                "required"
            ],
            "products.*.count" => [
                "required",
                "integer"
            ],
            "products.*.size" => [
                "required",
                "integer"
            ],
            "products.*.elaborated" => [
                "required",
                "boolean"
            ],
            "products.*.reserved" => [
                "required",
                "boolean"
            ],
            "products.*.marked" => [
                "required",
                "boolean"
            ],
            "products.*.comment" => [
                "nullable",
                "string"
            ],
            "products.*.color_id" => [
                "required"
            ],
            "products.*.gems" => [
                "nullable",
                "array"
            ],
            "products.*.gems.*. gem_id" => [
                "sometimes"
            ],
            "products.*.gems.*.color_id" => [
                "sometimes"
            ]
        ];
    }
}
