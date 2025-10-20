<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Customer;
use App\Models\Material;
use App\Models\Order;
use Faker\Factory as Faker;

class MaterialHistorySeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $customers = Customer::pluck('id')->toArray();
        $materials = Material::pluck('id')->toArray();
        $orders = Order::pluck('id')->toArray();

        foreach (range(1, 20) as $i) {
            DB::table('material_histories')->insert([
                'id' => (string) Str::uuid(),
                'customer_id' => $faker->randomElement($customers),
                'material_id' => $faker->randomElement($materials),
                'order_id' => $faker->randomElement($orders),
                'amount' => $faker->randomFloat(2, 1, 100),
                'notes' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
