<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\Customer;

use Carbon\Carbon;
use Faker\Factory as Faker;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $customers = Customer::pluck('id')->toArray();

        foreach (range(1, 50) as $i) {
            $amount = $faker->randomFloat(2, 10, 1000);
            DB::table('transactions')->insert([
                'id' => (string) Str::uuid(),
                'customer_id' => $faker->randomElement($customers),
                'amount' => $amount,
                'date' => Carbon::now()->subDays(rand(0, 365)),
                'note' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
