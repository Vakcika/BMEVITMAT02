<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GemShapeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('gem_shapes')->insert([
            ['name' => 'Round', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Oval', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Princess', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
