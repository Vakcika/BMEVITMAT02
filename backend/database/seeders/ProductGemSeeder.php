<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Gem;
use App\Models\ProductGem;

class ProductGemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $gems = Gem::all();


        foreach ($products as $product) {
            $randomGems = $gems->random(rand(1, 4));

            foreach ($randomGems as $gem) {
                ProductGem::create([
                    'product_id' => $product->id,
                    'gem_id'     => $gem->id,
                    'count'      => rand(1, 10),
                ]);
            }
        }
    }
}
