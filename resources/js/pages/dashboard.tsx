import { Head } from '@inertiajs/react';
import { Users, CheckCircle, DollarSign } from 'lucide-react';
import { dashboard } from '@/routes';

export default function Dashboard({
    stats,
    clientesConRemesas,
    mensajerosConRemesas,
}: {
    stats: {
        clientes: number;
        remesas_entregadas: number;
        fondos_adquiridos: number;
    };
    clientesConRemesas: Array<{
        id: number;
        nombre: string;
        telefono: string;
        total_remesas: number;
    }>;
    mensajerosConRemesas: Array<{
        id: number;
        nombre: string;
        telefono: string;
        remesas_entregadas: number;
    }>;
}) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Cantidad de Clientes
                                </p>
                                <p className="text-3xl font-bold">
                                    {stats.clientes}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Remesas Entregadas
                                </p>
                                <p className="text-3xl font-bold">
                                    {stats.remesas_entregadas}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                                <DollarSign className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Fondos Adquiridos
                                </p>
                                <p className="text-3xl font-bold">
                                    ${stats.fondos_adquiridos}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-sm">
                        <div className="border-b border-sidebar-border/70 p-4">
                            <h3 className="font-semibold">
                                Clientes con Remesas
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-sidebar-border/70 text-left text-sm text-muted-foreground">
                                        <th className="p-4">Cliente</th>
                                        <th className="p-4">Teléfono</th>
                                        <th className="p-4 text-right">
                                            Remesas
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientesConRemesas.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="p-4 text-center text-muted-foreground"
                                            >
                                                No hay clientes
                                            </td>
                                        </tr>
                                    ) : (
                                        clientesConRemesas.map((cliente) => (
                                            <tr
                                                key={cliente.id}
                                                className="border-b border-sidebar-border/50 last:border-0"
                                            >
                                                <td className="p-4 font-medium">
                                                    {cliente.nombre}
                                                </td>
                                                <td className="p-4 text-muted-foreground">
                                                    {cliente.telefono}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                        {cliente.total_remesas}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-sm">
                        <div className="border-b border-sidebar-border/70 p-4">
                            <h3 className="font-semibold">
                                Mensajeros con Entregas
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-sidebar-border/70 text-left text-sm text-muted-foreground">
                                        <th className="p-4">Mensajero</th>
                                        <th className="p-4">Teléfono</th>
                                        <th className="p-4 text-right">
                                            Entregadas
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mensajerosConRemesas.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="p-4 text-center text-muted-foreground"
                                            >
                                                No hay mensajeros
                                            </td>
                                        </tr>
                                    ) : (
                                        mensajerosConRemesas.map(
                                            (mensajero) => (
                                                <tr
                                                    key={mensajero.id}
                                                    className="border-b border-sidebar-border/50 last:border-0"
                                                >
                                                    <td className="p-4 font-medium">
                                                        {mensajero.nombre}
                                                    </td>
                                                    <td className="p-4 text-muted-foreground">
                                                        {mensajero.telefono}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            {
                                                                mensajero.remesas_entregadas
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
