<?php

namespace App\Models;

use Database\Factories\MensajeroFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nombre', 'telefono', 'residencia'])]
class Mensajero extends Model
{
    /** @use HasFactory<MensajeroFactory> */
    use HasFactory;
}
