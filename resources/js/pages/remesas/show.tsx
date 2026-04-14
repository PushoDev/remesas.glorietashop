import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import remesas from '@/routes/remesas';

const BREADCRUMBS = [
    { title: 'Remesas', href: remesas.index().url },
    { title: 'Detalles', href: '#' },
];

export default function ShowRemesa({
    remesa,
}: {
    remesa: {
        id: number;
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
        created_at: string;
        cliente: { id: number; nombre: string; telefono: string };
        mensajero: { id: number; nombre: string };
    };
}) {
    return (
        <>
            <Head title={`Remesa #${remesa.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={remesas.index().url}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${remesa.entregado ? 'bg-green-100' : 'bg-yellow-100'}`}
                        >
                            {remesa.entregado ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <Clock className="h-5 w-5 text-yellow-600" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Remesa #{remesa.id}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {new Date(remesa.created_at).toLocaleDateString(
                                    'es-ES',
                                    {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    },
                                )}
                            </p>
                        </div>
                    </div>
                    <span
                        className={`ml-auto inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${remesa.entregado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                        {remesa.entregado ? 'Entregado' : 'En Proceso'}
                    </span>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold">Cliente</h3>
                        <div className="space-y-2">
                            <p className="font-medium">
                                {remesa.cliente.nombre}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {remesa.cliente.telefono}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold">Beneficiario</h3>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    Nombre:
                                </span>
                                <p className="font-medium">
                                    {remesa.nombre_beneficiario}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    Teléfono:
                                </span>
                                <p className="font-medium">
                                    {remesa.telefono_beneficiario}
                                </p>
                            </div>
                            {remesa.direccion_beneficiario && (
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        Dirección:
                                    </span>
                                    <p className="font-medium">
                                        {remesa.direccion_beneficiario}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold">Pago del Cliente</h3>
                        <div className="flex flex-col gap-6">
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    Moneda de Envío:
                                </span>
                                <p className="font-medium">
                                    {remesa.moneda_envio}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    Método de Pago:
                                </span>
                                <p className="font-medium">
                                    {remesa.metodo_pago}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    Monto que Paga:
                                </span>
                                <p className="text-xl font-bold">
                                    {remesa.monto_envio} {remesa.moneda_envio}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold">Entrega</h3>
                        <div className="flex flex-col gap-6">
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    Cantidad a Recibir:
                                </span>
                                <p className="text-2xl font-bold">
                                    {remesa.cantidad_recibir}{' '}
                                    {remesa.moneda_recibe}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    Forma de Entrega:
                                </span>
                                <p className="font-medium">
                                    {remesa.forma_entrega === 'efectivo'
                                        ? 'Efectivo'
                                        : 'Transferencia'}
                                </p>
                            </div>
                            {remesa.numero_tarjeta && (
                                <div>
                                    <span className="text-sm text-muted-foreground">
                                        Número de Tarjeta:
                                    </span>
                                    <p className="font-medium">
                                        {remesa.numero_tarjeta}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {remesa.observaciones && (
                        <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                            <h3 className="mb-4 font-semibold">
                                Observaciones
                            </h3>
                            <p className="text-sm">{remesa.observaciones}</p>
                        </div>
                    )}

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold">Mensajero</h3>
                        <p className="font-medium">{remesa.mensajero.nombre}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

ShowRemesa.layout = { breadcrumbs: BREADCRUMBS };
