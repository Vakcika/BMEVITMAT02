<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Customer;
use Faker\Factory as Faker;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $customers = Customer::pluck('id')->toArray();

        foreach (range(1, 15) as $i) {
            DB::table('materials')->insert([
                'customer_id' => $faker->randomElement($customers),
                'material_type' => $faker->randomElement(['14K', '18K', 'SILVER', 'BRONZE']),
                'material_name' => $faker->word,
                'raw_casting_price' => $faker->numberBetween(100, 500),
                'wrought_casting_price' => $faker->numberBetween(200, 800),
                'raw_casting_loss' => $faker->randomFloat(2, 0, 10),
                'wrought_casting_loss' => $faker->randomFloat(2, 0, 10),
                'mark_price' => $faker->numberBetween(100, 500),
                'trade_in_price' => $faker->numberBetween(100, 500),
                'stub_placement_price' => $faker->numberBetween(50, 200),
                'stub_removal_price' => $faker->numberBetween(50, 200),
                'extra_charge' => $faker->numberBetween(0, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
