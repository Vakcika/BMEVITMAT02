<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'shape_id'   => $this->shape_id,
            'color_id'   => $this->color_id,
            'weight'     => $this->weight,
            'size'       => $this->size,
            'img_url'    => $this->img_url,
            'notes'      => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
