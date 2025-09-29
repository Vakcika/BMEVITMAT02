<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $gems = [];
        foreach ($this->gems as $gem) {
            $gems[] = [
                "id" => $gem->id,
                "color_name" => $gem->color->name,
                "shape_name" => $gem->shape->name,
                "count" => $gem->pivot->count,
                "size" => $gem->size,
            ];
        }
        return [
            'id'         => $this->id,
            'name'         => $this->name,
            'category' => $this->category->name,
            "gems" => $gems,
            'weight'     => $this->weight,
            'size'       => $this->size,
            'image_url'    => $this->image_url,
            'notes'      => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
