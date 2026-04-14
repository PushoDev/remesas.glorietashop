<?php

namespace Database\Factories;

use App\Models\Mensajero;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mensajero>
 */
class MensajeroFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->name(),
            'telefono' => fake()->phoneNumber(),
            'residencia' => fake()->address(),
        ];
    }
}
