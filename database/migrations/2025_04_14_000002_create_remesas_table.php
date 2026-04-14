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
        Schema::create('remesas', function (Blueprint $table) {
            $table->id();

            // Cliente que realiza la remesa
            $table->foreignId('cliente_id')->constrained('clients')->onDelete('cascade');

            // Datos del beneficiario
            $table->string('nombre_beneficiario');
            $table->string('telefono_beneficiario');
            $table->string('direccion_beneficiario')->nullable();

            // Moneda y método de pago (remitente)
            $table->enum('moneda_envio', ['USD', 'EUR']);
            $table->enum('metodo_pago', ['Zelle', 'Visa', 'MasterCard', 'GooglePay', 'Paypal', 'Stripe', 'Otros']);

            // Cantidad y forma de entrega
            $table->decimal('cantidad_recibir', 10, 2);
            $table->enum('forma_entrega', ['efectivo', 'transferencia']);
            $table->enum('moneda_recibe', ['USD', 'MLC', 'CUP']);

            // Solo si es transferencia
            $table->string('numero_tarjeta', 19)->nullable();

            // Estado y mensajero
            $table->boolean('entregado')->default(false);
            $table->foreignId('mensajero_id')->constrained('mensajeros')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remesas');
    }
};
