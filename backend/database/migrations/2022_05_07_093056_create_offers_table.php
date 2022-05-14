<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('property_type_id');
            $table->foreign('property_type_id')
                ->references('id')
                ->on('property_types')
                ->onDelete('no action');
            $table->unsignedBigInteger('offer_status_id');
            $table->foreign('offer_status_id')
                ->references('id')
                ->on('offer_statuses')
                ->onDelete('no action');
            $table->unsignedBigInteger('offer_type_id');
            $table->foreign('offer_type_id')
                ->references('id')
                ->on('offer_types')
                ->onDelete('no action');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('no action');
            $table->string('title', 255);
            $table->unsignedBigInteger("area_square_meters");
            $table->unsignedBigInteger("price");
            $table->string('locality', 255);
            $table->string('description', 1000);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offers');
    }
};
