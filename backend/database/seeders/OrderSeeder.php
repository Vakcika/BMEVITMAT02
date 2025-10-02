<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Customer;
use App\Models\ShippingPrice;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $customers = Customer::pluck('id')->toArray();
        $shipping = ShippingPrice::pluck('id')->toArray();

        foreach (range(1, 30) as $i) {
            DB::table('orders')->insert([
                'id' => (string) Str::uuid(),
                'customer_id' => $faker->randomElement($customers),
                'shipping_price_id' => $faker->randomElement($shipping),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
