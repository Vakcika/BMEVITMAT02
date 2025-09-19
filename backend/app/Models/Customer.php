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
}
