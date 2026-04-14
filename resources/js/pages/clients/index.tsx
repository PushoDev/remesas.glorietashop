import { Form, Head, router } from '@inertiajs/react';
import { Search, User, Plus, Pencil, Trash2 } from 'lucide-react';
import clients from '@/routes/clients';

export default function ClientsIndex({
    clients: clientList,
    filters,
}: {
    clients: {
        data: Array<{
            id: number;
            nombre: string;
            telefono: string;
            direccion_residencia: string | null;
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: { search?: string };
}) {
    return (
        <>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Clientes
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {clientList.total} clientes registrados
                            </p>
                        </div>
                    </div>
                    <a
                        href={clients.create().url}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Nuevo Cliente
                    </a>
                </div>

                <div className="relative">
                    <Form
                        action={clients.index().url}
                        method="get"
                        className="flex items-center gap-2"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="search"
                                name="search"
                                placeholder="Buscar por nombre o teléfono..."
                                defaultValue={filters.search}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </Form>
                </div>

                <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {clientList.data.length === 0 ? (
                        <div className="relative col-span-full flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                            <User className="mb-4 h-12 w-12 text-muted-foreground" />
                            <h3 className="mb-2 text-lg font-semibold">
                                No hay clientes
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Comienza agregando tu primer cliente.
                            </p>
                        </div>
                    ) : (
                        clientList.data.map((client) => (
                            <div
                                key={client.id}
                                className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <span className="text-lg font-semibold text-primary">
                                                {client.nombre
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="leading-none font-semibold">
                                                {client.nombre}
                                            </h3>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                ID: {client.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                            Teléfono:
                                        </span>
                                        <span className="font-medium">
                                            {client.telefono}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">
                                            Dirección:
                                        </span>
                                        <span className="font-medium">
                                            {client.direccion_residencia || '-'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-2">
                                    <a
                                        href={clients.edit(client).url}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Editar
                                    </a>
                                    <form
                                        action={clients.destroy(client).url}
                                        method="post"
                                        onSubmit={(e) => {
                                            if (
                                                !confirm(
                                                    '¿Eliminar este cliente?',
                                                )
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        <input
                                            type="hidden"
                                            name="_method"
                                            value="delete"
                                        />
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {clientList.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {clientList.links.map((link, index) =>
                            link.url ? (
                                <Form
                                    key={index}
                                    action={link.url}
                                    method="get"
                                >
                                    <button
                                        type="submit"
                                        className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                                : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </Form>
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

ClientsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Clientes',
            href: clients.index().url,
        },
    ],
};
