<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GemColorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('gem_colors')->insert([
            ['name' => 'Red', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Blue', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Green', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
