<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Mensajero;
use App\Models\Remesa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Remesa>
 */
class RemesaFactory extends Factory
{
    protected $model = Remesa::class;

    public function definition(): array
    {
        $formaEntrega = fake()->randomElement(['efectivo', 'transferencia']);

        return [
            'cliente_id' => Client::factory(),
            'nombre_beneficiario' => fake()->name(),
            'telefono_beneficiario' => fake()->phoneNumber(),
            'direccion_beneficiario' => fake()->address(),
            'moneda_envio' => fake()->randomElement(['USD', 'EUR']),
            'metodo_pago' => fake()->randomElement(['Zelle', 'Visa', 'MasterCard', 'GooglePay', 'Paypal', 'Stripe', 'Otros']),
            'cantidad_recibir' => fake()->randomFloat(2, 50, 5000),
            'forma_entrega' => $formaEntrega,
            'moneda_recibe' => $formaEntrega === 'efectivo'
                ? fake()->randomElement(['USD', 'CUP'])
                : fake()->randomElement(['USD', 'MLC', 'CUP']),
            'numero_tarjeta' => $formaEntrega === 'transferencia' ? fake()->creditCardNumber() : null,
            'entregado' => fake()->boolean(),
            'mensajero_id' => Mensajero::factory(),
        ];
    }

    public function entregado(): static
    {
        return $this->state(fn (array $attributes) => [
            'entregado' => true,
        ]);
    }

    public function enProceso(): static
    {
        return $this->state(fn (array $attributes) => [
            'entregado' => false,
        ]);
    }
}
