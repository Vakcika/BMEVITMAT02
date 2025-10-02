<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('material_history', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('material_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name', 255)->default('');
            $table->string('type', 6)->default('expense');
            $table->decimal('amount', 15, 2)->default(0);
            $table->text('notes')->default('');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('material_history');
    }
};
