import { Head } from '@inertiajs/react';
import {
    Send,
    Plus,
    Pencil,
    Trash2,
    CheckCircle,
    Clock,
    Search,
} from 'lucide-react';
import remesas from '@/routes/remesas';

export default function RemesasIndex({
    remesas: remesaList,
    filters,
}: {
    remesas: {
        data: Array<{
            id: number;
            nombre_beneficiario: string;
            telefono_beneficiario: string;
            moneda_envio: string;
            metodo_pago: string;
            cantidad_recibir: string;
            forma_entrega: string;
            moneda_recibe: string;
            numero_tarjeta: string | null;
            observaciones: string | null;
            entregado: boolean;
            created_at: string;
            cliente: { id: number; nombre: string };
            mensajero: { id: number; nombre: string };
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: { search?: string; estado?: string };
}) {
    return (
        <>
            <Head title="Remesas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Send className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Remesas
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {remesaList.total} remesas registradas
                            </p>
                        </div>
                    </div>
                    <a
                        href={remesas.create().url}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Nueva Remesa
                    </a>
                </div>

                <form
                    action={remesas.index().url}
                    method="get"
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="search"
                            name="search"
                            placeholder="Buscar..."
                            defaultValue={filters.search}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm"
                        />
                    </div>
                    <select
                        name="estado"
                        defaultValue={filters.estado}
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="">Todos</option>
                        <option value="entregado">Entregados</option>
                        <option value="proceso">En Proceso</option>
                    </select>
                </form>

                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    {remesaList.data.length === 0 ? (
                        <div className="relative col-span-full flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                            <Send className="mb-4 h-12 w-12 text-muted-foreground" />
                            <h3 className="mb-2 text-lg font-semibold">
                                No hay remesas
                            </h3>
                        </div>
                    ) : (
                        remesaList.data.map((remesa) => (
                            <div
                                key={remesa.id}
                                className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-full ${remesa.entregado ? 'bg-green-100' : 'bg-yellow-100'}`}
                                        >
                                            {remesa.entregado ? (
                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                            ) : (
                                                <Clock className="h-6 w-6 text-yellow-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="leading-none font-semibold">
                                                {remesa.nombre_beneficiario}
                                            </h3>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                ID: {remesa.id} •{' '}
                                                {remesa.forma_entrega ===
                                                'efectivo'
                                                    ? 'Efectivo'
                                                    : 'Transferencia'}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${remesa.entregado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                                    >
                                        {remesa.entregado
                                            ? 'Entregado'
                                            : 'En Proceso'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">
                                            Cliente:
                                        </span>
                                        <p className="font-medium">
                                            {remesa.cliente.nombre}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">
                                            Mensajero:
                                        </span>
                                        <p className="font-medium">
                                            {remesa.mensajero.nombre}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">
                                            Recibe:
                                        </span>
                                        <p className="font-medium">
                                            {remesa.cantidad_recibir}{' '}
                                            {remesa.moneda_recibe}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">
                                            Pago:
                                        </span>
                                        <p className="font-medium">
                                            {remesa.metodo_pago} (
                                            {remesa.moneda_envio})
                                        </p>
                                    </div>
                                    {remesa.numero_tarjeta && (
                                        <div className="col-span-2">
                                            <span className="text-muted-foreground">
                                                Tarjeta:
                                            </span>
                                            <p className="font-medium">
                                                {remesa.numero_tarjeta}
                                            </p>
                                        </div>
                                    )}
                                    {remesa.observaciones && (
                                        <div className="col-span-2">
                                            <span className="text-muted-foreground">
                                                Observaciones:
                                            </span>
                                            <p className="font-medium">
                                                {remesa.observaciones}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {remesa.entregado ? (
                                        <button
                                            disabled
                                            className="flex cursor-not-allowed items-center gap-2 rounded-md border border-green-500 bg-green-100 px-3 py-2 text-sm font-medium text-green-600 opacity-70"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                            Entregado
                                        </button>
                                    ) : (
                                        <form
                                            action={`/remesas/${remesa.id}/toggle-entregado`}
                                            method="post"
                                        >
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 rounded-md border border-green-500 bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                Finalizar Entrega
                                            </button>
                                        </form>
                                    )}
                                    <a
                                        href={
                                            remesa.entregado
                                                ? `/remesas/${remesa.id}`
                                                : `/remesas/${remesa.id}/edit`
                                        }
                                        className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        {remesa.entregado
                                            ? 'Ver Detalles'
                                            : 'Editar'}
                                    </a>
                                    <form
                                        action={`/remesas/${remesa.id}`}
                                        method="post"
                                        onSubmit={(e) => {
                                            if (
                                                !confirm(
                                                    '¿Eliminar esta remesa?',
                                                )
                                            )
                                                e.preventDefault();
                                        }}
                                    >
                                        <input
                                            type="hidden"
                                            name="_method"
                                            value="delete"
                                        />
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {remesaList.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {remesaList.links.map((link, index) =>
                            link.url ? (
                                <form
                                    key={index}
                                    action={link.url}
                                    method="get"
                                >
                                    <button
                                        type="submit"
                                        className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary text-primary-foreground' : 'border border-input bg-background hover:bg-accent'}`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </form>
                            ) : (
                                <button
                                    key={index}
                                    disabled
                                    className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium opacity-50"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

RemesasIndex.layout = {
    breadcrumbs: [{ title: 'Remesas', href: remesas.index().url }],
};
