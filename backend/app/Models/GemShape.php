<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GemShape extends Model
{
    protected $fillable = ['name'];

    public function gems()
    {
        return $this->hasMany(Gem::class, 'shape_id');
    }
}
