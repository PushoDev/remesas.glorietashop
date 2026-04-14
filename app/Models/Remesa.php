<?php

namespace App\Models;

use Database\Factories\RemesaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Remesa extends Model
{
    /** @use HasFactory<RemesaFactory> */
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'nombre_beneficiario',
        'telefono_beneficiario',
        'direccion_beneficiario',
        'moneda_envio',
        'metodo_pago',
        'monto_envio',
        'cantidad_recibir',
        'forma_entrega',
        'moneda_recibe',
        'numero_tarjeta',
        'observaciones',
        'entregado',
        'mensajero_id',
    ];

    protected $casts = [
        'entregado' => 'boolean',
        'monto_envio' => 'decimal:2',
        'cantidad_recibir' => 'decimal:2',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function mensajero(): BelongsTo
    {
        return $this->belongsTo(Mensajero::class);
    }
}
