<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'gem_id',
        'gem_count',
        'weight',
        'size',
        'img_url',
        'notes',
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function gem()
    {
        return $this->belongsTo(Gem::class, 'gem_id');
    }

    public function castings()
    {
        return $this->hasMany(Cast::class);
    }
}
