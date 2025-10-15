<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // --- Transactions sum ---
        $transactions_sum = $this->transactions->sum('amount');

        // --- Material balances by type ---
        $balances_by_type = [];
        $total_gold_14k_equivalent = 0;

        // Gold conversion factors (to 999)
        $karat_to_999 = [
            '9K' => 0.375,
            '14K' => 0.585,
            '18K' => 0.750,
            '999' => 1.0,
        ];

        foreach ($this->materialHistory as $history) {
            $type = $history->material->type;
            $amount = $history->amount;

            if (!isset($balances_by_type[$type])) {
                $balances_by_type[$type] = 0;
            }

            $balances_by_type[$type] += $amount;

            // Convert gold types to 14K equivalent
            if (isset($karat_to_999[$type])) {
                $amount_in_999 = $amount * $karat_to_999[$type];

                if ($type === 'scrap') {
                    $amount_in_999 *= 0.95;
                }

                $gold_in_14k = $amount_in_999 / $karat_to_999['14K'];
                $total_gold_14k_equivalent += $gold_in_14k;
            }
        }

        $total_materials = collect($balances_by_type)->sum();

        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'name' => $this->name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'address' => $this->address,
            'tax_number' => $this->tax_number,
            'website' => $this->website,
            'description' => $this->description,

            'balances' => [
                'by_type' => array_map(fn($v) => round($v, 2), $balances_by_type),
                'total_gold_14k_equivalent' => round($total_gold_14k_equivalent, 2),
                'total_materials' => round($total_materials, 2),
                'transactions' => round($transactions_sum, 2),
            ],

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
