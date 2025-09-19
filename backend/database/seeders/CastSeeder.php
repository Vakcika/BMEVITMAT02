<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Product;
use App\Models\Order;
use App\Models\Material;
use Faker\Factory as Faker;

class CastSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $products = Product::pluck('id')->toArray();
        $orders = Order::pluck('id')->toArray();
        $materials = Material::pluck('id')->toArray();

        foreach (range(1, 30) as $i) {
            DB::table('casts')->insert([
                'id' => (string) Str::uuid(),
                'product_id' => $faker->randomElement($products),
                'order_id' => $faker->randomElement($orders),
                'material_id' => $faker->randomElement($materials),
                'amount' => $faker->numberBetween(1, 100),
                'amount_successful' => $faker->numberBetween(0, 100),
                'wrought' => $faker->boolean,
                'reserved' => $faker->boolean,
                'marked' => $faker->boolean,
                'comment' => $faker->sentence,
                'date' => $faker->date(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
