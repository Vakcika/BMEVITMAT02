<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductGemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'product_id' => $this->product_id,
            'gem_id'     => $this->gem_id,
            'count'      => $this->count,
            'size'       => $this->size ?? $this->gem->size ?? null,
            'gem' => $this->whenLoaded('gem'),
        ];
    }
}
