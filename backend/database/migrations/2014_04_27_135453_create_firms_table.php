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
        Schema::create('firms', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('NIP', 13);
            $table->string('REGON', 20);
            $table->string('street', 13)->nullable();
            $table->string('number', 100);
            $table->string('zip_code', 6);
            $table->string('locality', 100);
            $table->string('logo', 100)->nullable();
            $table->string('logo_url', 100)->nullable();
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
        Schema::dropIfExists('firms');
    }
};
