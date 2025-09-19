<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\ProductCategory;
use App\Models\Gem;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $categories = ProductCategory::pluck('id')->toArray();
        $gems = Gem::pluck('id')->toArray();

        foreach (range(1, 30) as $i) {
            DB::table('products')->insert([
                'category_id' => $faker->randomElement($categories),
                'gem_id' => $faker->randomElement($gems),
                'gem_count' => $faker->numberBetween(1, 5),
                'weight' => $faker->randomFloat(2, 1, 100),
                'size' => $faker->randomElement(['S', 'M', 'L']),
                'img_url' => $faker->imageUrl(300, 300, 'jewelry'),
                'notes' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
