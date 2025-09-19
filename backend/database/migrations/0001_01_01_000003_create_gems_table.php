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
        Schema::create('gems', function (Blueprint $table) {
            $table->id();
            $table->double('size');
            $table->foreignId('color_id')->constrained('gem_colors')->onDelete('cascade');
            $table->foreignId('shape_id')->constrained('gem_shapes')->onDelete('cascade');
            $table->integer('price');
            $table->integer('booking_price')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gems');
    }
};
