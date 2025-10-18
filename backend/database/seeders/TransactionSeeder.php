<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Customer;
use App\Models\Order;
use Faker\Factory as Faker;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $customers = Customer::pluck('id')->toArray();
        $orders = Order::pluck('id')->toArray();

        foreach (range(1, 50) as $i) {
            DB::table('transactions')->insert([
                'id' => (string) Str::uuid(),
                'customer_id' => $faker->randomElement($customers),
                'order_id' => $faker->randomElement($orders),
                'amount' => $faker->randomFloat(2, 10, 1000),
                'note' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
