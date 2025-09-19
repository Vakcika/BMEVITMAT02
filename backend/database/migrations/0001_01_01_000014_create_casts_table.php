<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('casts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('material_id')->constrained()->onDelete('cascade');
            $table->integer('amount');
            $table->integer('amount_successful')->nullable();
            $table->boolean('wrought')->default(false);
            $table->boolean('reserved')->default(false);
            $table->boolean('marked')->default(false);
            $table->string('comment')->nullable();
            $table->date('date')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('casts');
    }
};
