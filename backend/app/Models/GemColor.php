<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GemColor extends Model
{
    protected $fillable = ['name'];

    public function gems()
    {
        return $this->hasMany(Gem::class, 'color_id');
    }
}
