<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['14K', '18K', 'SILVER', 'BRONZE']);
            $table->string('name', 55);
            $table->integer('raw_casting_price')->default(0);
            $table->integer('wrought_casting_price')->default(0);
            $table->double('raw_casting_loss')->default(0);
            $table->double('wrought_casting_loss')->default(0);
            $table->integer('mark_price')->default(0);
            $table->integer('trade_in_price')->default(0);
            $table->integer('stub_placement_price')->default(0);
            $table->integer('stub_removal_price')->default(0);
            $table->integer('extra_charge')->default(0);
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
