<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category_id',
        'gem_id',
        'gem_count',
        'weight',
        'size',
        'image_url',
        'notes',
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function gems()
    {
        return $this->hasMany(ProductGem::class, 'product_id');
    }

    public function castings()
    {
        return $this->hasMany(Cast::class);
    }
}
