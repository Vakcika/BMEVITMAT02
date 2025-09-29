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
        $gem = Gem::first() ?? Gem::factory()->create();

        foreach (range(1, 30) as $i) {
            DB::table('products')->insert([
                'name' => $faker->name,
                'category_id' => $faker->randomElement($categories),
                'gem_id' => $gem->id,
                'gem_count' => $faker->numberBetween(1, 5),
                'weight' => $faker->randomFloat(2, 1, 100),
                'size' => $faker->randomElement(['S', 'M', 'L']),
                'image_url' => 'https://goldatti.cdn.shoprenter.hu/custom/goldatti/image/cache/w350h350wt1q100/product/termek/00'. $faker->numberBetween(1, 9).'s.jpg',
                'notes' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
