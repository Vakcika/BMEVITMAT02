<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CustomerSeeder::class,
            ShippingPriceSeeder::class,
            ProductCategorySeeder::class,
            GemColorSeeder::class,
            GemShapeSeeder::class,
            GemSeeder::class,
            ProductSeeder::class,
            MaterialSeeder::class,
            OrderSeeder::class,
            TransactionSeeder::class,
            CastSeeder::class,
            MaterialHistorySeeder::class,
        ]);
    }
}
