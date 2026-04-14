<?php

namespace App\Http\Requests\Remesas;

use Illuminate\Foundation\Http\FormRequest;

class StoreRemesaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cliente_id' => ['required', 'exists:clients,id'],
            'nombre_beneficiario' => ['required', 'string', 'max:255'],
            'telefono_beneficiario' => ['required', 'string', 'max:50'],
            'direccion_beneficiario' => ['nullable', 'string', 'max:500'],
            'moneda_envio' => ['required', 'in:USD,EUR'],
            'metodo_pago' => ['required', 'in:Zelle,Visa,MasterCard,GooglePay,Paypal,Stripe,Otros'],
            'monto_envio' => ['required', 'numeric', 'min:0.01'],
            'cantidad_recibir' => ['required', 'numeric', 'min:0.01'],
            'forma_entrega' => ['required', 'in:efectivo,transferencia'],
            'moneda_recibe' => ['required', 'in:USD,MLC,CUP'],
            'numero_tarjeta' => ['nullable', 'required_if:forma_entrega,transferencia', 'regex:/^\d{4}-\d{4}-\d{4}-\d{4}$/'],
            'observaciones' => ['nullable', 'string', 'max:1000'],
            'mensajero_id' => ['required', 'exists:mensajeros,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'numero_tarjeta.regex' => 'El número de tarjeta debe tener el formato XXXX-XXXX-XXXX-XXXX.',
            'numero_tarjeta.required_if' => 'El número de tarjeta es requerido para transferencias.',
        ];
    }
}
