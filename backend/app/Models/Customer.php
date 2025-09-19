<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'company_name',
        'name',
        'phone_number',
        'email',
        'address',
        'tax_number',
        'website',
        'description',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }
}
