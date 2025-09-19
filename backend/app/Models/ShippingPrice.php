<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingPrice extends Model
{
    protected $fillable = ['price'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
