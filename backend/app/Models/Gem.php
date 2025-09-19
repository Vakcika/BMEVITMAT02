<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gem extends Model
{
    protected $fillable = [
        'size',
        'color_id',
        'shape_id',
        'price',
        'booking_price',
    ];

    public function color()
    {
        return $this->belongsTo(GemColor::class, 'color_id');
    }

    public function shape()
    {
        return $this->belongsTo(GemShape::class, 'shape_id');
    }
}
