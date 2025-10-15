<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'customer_id',
        'shipping_price_id'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function shippingPrice()
    {
        return $this->belongsTo(ShippingPrice::class);
    }

    public function castings()
    {
        return $this->hasMany(Cast::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
