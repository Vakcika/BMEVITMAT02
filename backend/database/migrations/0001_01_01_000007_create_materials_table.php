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
            $table->string('name');
            $table->integer('raw_casting_price');
            $table->integer('wrought_casting_price');
            $table->double('raw_casting_loss');
            $table->double('wrought_casting_loss');
            $table->integer('mark_price');
            $table->integer('trade_in_price');
            $table->integer('stub_placement_price');
            $table->integer('stub_removal_price');
            $table->integer('extra_charge')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
