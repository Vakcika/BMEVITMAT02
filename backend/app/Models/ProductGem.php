<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductGem extends Model
{
    use HasFactory;

    protected $table = 'product_gems';

    protected $fillable = [
        'product_id',
        'gem_id',
        'count',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function gem()
    {
        return $this->belongsTo(Gem::class, 'gem_id');
    }
}
