<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShippingPriceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('shipping_prices')->insert([
            ['price' => 1000, 'created_at' => now(), 'updated_at' => now()],
            ['price' => 2500, 'created_at' => now(), 'updated_at' => now()],
            ['price' => 5000, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
