<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'user_id',
        'status_id',
        'company_name',
        'name',
        'phone_number',
        'email',
        'address',
        'tax_number',
        'website',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(CustomerStatus::class);
    }
}
