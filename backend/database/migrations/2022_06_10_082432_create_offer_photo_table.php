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
        Schema::create('offer_photo', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('photo_id');
            $table->foreign('photo_id')
                ->references('id')
                ->on('photos')
                ->onDelete('no action');
            $table->unsignedBigInteger('offer_id');
            $table->foreign('offer_id')
                ->references('id')
                ->on('offers')
                ->onDelete('no action');
            $table->boolean('isMain');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offer_photo');
    }
};
