<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'customer_id',
        'type',
        'name',
        'raw_casting_price',
        'wrought_casting_price',
        'raw_casting_loss',
        'wrought_casting_loss',
        'mark_price',
        'trade_in_price',
        'stub_placement_price',
        'stub_removal_price',
        'extra_charge',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function castings()
    {
        return $this->hasMany(Cast::class);
    }
}
