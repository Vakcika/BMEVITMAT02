<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'customer' => new CustomerResource($this->customer),
            'material' => new MaterialResource($this->material),
            'order'    => new OrderResource($this->order),
            'amount'      => $this->amount,
            'balances' => $this->balances ?? [],
            'notes'       => $this->notes,
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
        ];
    }
}
