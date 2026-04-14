<?php

namespace App\Models;

use Database\Factories\ClientFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nombre', 'telefono', 'direccion_residencia'])]
class Client extends Model
{
    /** @use HasFactory<ClientFactory> */
    use HasFactory;
}
