<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $i) {
            DB::table('customers')->insert([
                'company_name' => $faker->company,
                'name' => $faker->name,
                'phone_number' => $faker->phoneNumber,
                'email' => $faker->unique()->safeEmail,
                'address' => $faker->address,
                'tax_number' => $faker->randomNumber(8),
                'website' => $faker->domainName,
                'description' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
