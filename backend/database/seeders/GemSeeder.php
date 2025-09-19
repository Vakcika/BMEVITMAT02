<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\GemColor;
use App\Models\GemShape;
use Faker\Factory as Faker;

class GemSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $colors = GemColor::pluck('id')->toArray();
        $shapes = GemShape::pluck('id')->toArray();

        foreach (range(1, 20) as $i) {
            DB::table('gems')->insert([
                'size' => $faker->randomFloat(2, 0.5, 10),
                'color_id' => $faker->randomElement($colors),
                'shape_id' => $faker->randomElement($shapes),
                'price' => $faker->numberBetween(100, 5000),
                'booking_price' => $faker->numberBetween(50, 2000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
