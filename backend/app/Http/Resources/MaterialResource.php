<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'type' => $this->material_type,
            'name' => $this->material_name,
            'raw_casting_price' => $this->raw_casting_price,
            'wrought_casting_price' => $this->wrought_casting_price,
            'raw_casting_loss' => $this->raw_casting_loss,
            'wrought_casting_loss' => $this->wrought_casting_loss,
            'mark_price' => $this->mark_price,
            'trade_in_price' => $this->trade_in_price,
            'stub_placement_price' => $this->stub_placement_price,
            'stub_removal_price' => $this->stub_removal_price,
            'extra_charge' => $this->extra_charge,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
