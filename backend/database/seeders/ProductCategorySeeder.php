<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_categories')->insert([
            ['name' => 'Rings', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Necklaces', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bracelets', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
