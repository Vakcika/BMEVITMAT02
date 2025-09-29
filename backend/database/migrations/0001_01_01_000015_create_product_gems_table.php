<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_gems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('gem_id')->constrained('gems')->cascadeOnDelete();
            $table->integer('count')->default(1);
            $table->timestamps();

            $table->unique(['product_id', 'gem_id']); // prevents duplicates
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_gems');
    }
};
