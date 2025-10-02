<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('company_name', 255)->default('');
            $table->string('name', 55)->default('');
            $table->string('phone_number', 20)->default('');
            $table->string('email', 55)->unique()->default('');
            $table->text('address', 255)->default('');
            $table->string('tax_number', 55)->default('');
            $table->string('website', 255)->default('');
            $table->text('description')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
