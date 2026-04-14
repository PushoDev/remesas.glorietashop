import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';
import remesas from '@/routes/remesas';

const BREADCRUMBS = [
    { title: 'Remesas', href: remesas.index().url },
    { title: 'Editar', href: '#' },
];

export default function EditRemesa({
    remesa,
    clientes,
    mensajeros,
}: {
    remesa: {
        id: number;
        cliente_id: number;
        nombre_beneficiario: string;
        telefono_beneficiario: string;
        direccion_beneficiario: string | null;
        moneda_envio: string;
        metodo_pago: string;
        monto_envio: string;
        cantidad_recibir: string;
        forma_entrega: string;
        moneda_recibe: string;
        numero_tarjeta: string | null;
        observaciones: string | null;
        entregado: boolean;
        mensajero_id: number;
    };
    clientes: Array<{ id: number; nombre: string; telefono: string }>;
    mensajeros: Array<{ id: number; nombre: string }>;
}) {
    const [formaEntrega, setFormaEntrega] = useState<string>(
        remesa.forma_entrega,
    );

    const metodosPago = [
        'Zelle',
        'Visa',
        'MasterCard',
        'GooglePay',
        'Paypal',
        'Stripe',
        'Otros',
    ];
    const monedasEnvio = ['USD', 'EUR'];
    const monedasRecibe = ['USD', 'MLC', 'CUP'];

    return (
        <>
            <Head title="Editar Remesa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={remesas.index().url}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Editar Remesa
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Modifique los datos de la remesa
                        </p>
                    </div>
                </div>

                <form
                    action={remesas.update(remesa).url}
                    method="post"
                    className="flex flex-col gap-6"
                >
                    <input type="hidden" name="_method" value="put" />

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 font-semibold">
                            Datos del Cliente
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Cliente
                                </label>
                                <select
                                    name="cliente_id"
                                    defaultValue={remesa.cliente_id}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="">
                                        Seleccione un cliente
                                    </option>
                                    {clientes.map((cliente) => (
                                        <option
                                            key={cliente.id}
                                            value={cliente.id}
                                        >
                                            {cliente.nombre} -{' '}
                                            {cliente.telefono}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 font-semibold">
                            Datos del Beneficiario
                        </h3>
                        <div className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Nombre
                                </label>
                                <input
                                    name="nombre_beneficiario"
                                    defaultValue={remesa.nombre_beneficiario}
                                    placeholder="Nombre del beneficiario"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Teléfono
                                </label>
                                <input
                                    name="telefono_beneficiario"
                                    defaultValue={remesa.telefono_beneficiario}
                                    placeholder="Teléfono del beneficiario"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Dirección
                                </label>
                                <input
                                    name="direccion_beneficiario"
                                    defaultValue={
                                        remesa.direccion_beneficiario || ''
                                    }
                                    placeholder="Dirección de residencia (opcional)"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 font-semibold">Pago del Cliente</h3>
                        <div className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Moneda de Envío
                                </label>
                                <select
                                    name="moneda_envio"
                                    defaultValue={remesa.moneda_envio}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    {monedasEnvio.map((moneda) => (
                                        <option key={moneda} value={moneda}>
                                            {moneda}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Método de Pago
                                </label>
                                <select
                                    name="metodo_pago"
                                    defaultValue={remesa.metodo_pago}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    {metodosPago.map((metodo) => (
                                        <option key={metodo} value={metodo}>
                                            {metodo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Monto que Paga el Cliente
                                </label>
                                <input
                                    type="number"
                                    name="monto_envio"
                                    step="0.01"
                                    min="0.01"
                                    defaultValue={remesa.monto_envio}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 font-semibold">Forma de Entrega</h3>
                        <div className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Cantidad a Recibir
                                </label>
                                <input
                                    type="number"
                                    name="cantidad_recibir"
                                    step="0.01"
                                    min="0.01"
                                    defaultValue={remesa.cantidad_recibir}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Forma de Entrega
                                </label>
                                <select
                                    name="forma_entrega"
                                    defaultValue={remesa.forma_entrega}
                                    required
                                    onChange={(e) =>
                                        setFormaEntrega(e.target.value)
                                    }
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="efectivo">Efectivo</option>
                                    <option value="transferencia">
                                        Transferencia
                                    </option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Moneda que Recibe
                                </label>
                                <select
                                    name="moneda_recibe"
                                    defaultValue={remesa.moneda_recibe}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    {monedasRecibe.map((moneda) => (
                                        <option key={moneda} value={moneda}>
                                            {moneda}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {formaEntrega === 'transferencia' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Número de Tarjeta
                                    </label>
                                    <input
                                        name="numero_tarjeta"
                                        defaultValue={
                                            remesa.numero_tarjeta || ''
                                        }
                                        placeholder="XXXX-XXXX-XXXX-XXXX"
                                        pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 font-semibold">Observaciones</h3>
                        <div className="space-y-2">
                            <textarea
                                name="observaciones"
                                defaultValue={remesa.observaciones || ''}
                                placeholder="Referencias, datos adicionales de la entrega..."
                                rows={3}
                                className="flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <h3 className="mb-4 font-semibold">
                            Asignar Mensajero
                        </h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Mensajero
                            </label>
                            <select
                                name="mensajero_id"
                                defaultValue={remesa.mensajero_id}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">
                                    Seleccione un mensajero
                                </option>
                                {mensajeros.map((mensajero) => (
                                    <option
                                        key={mensajero.id}
                                        value={mensajero.id}
                                    >
                                        {mensajero.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            <Save className="h-4 w-4" />
                            Guardar Cambios
                        </button>
                        <Link
                            href={remesas.index().url}
                            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-6 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

EditRemesa.layout = { breadcrumbs: BREADCRUMBS };
