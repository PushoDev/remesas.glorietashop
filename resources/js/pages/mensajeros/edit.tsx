import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import mensajeros from '@/routes/mensajeros';

const BREADCRUMBS = [
    { title: 'Mensajeros', href: mensajeros.index().url },
    { title: 'Editar', href: '#' },
];

export default function EditMensajero({
    mensajero,
}: {
    mensajero: {
        id: number;
        nombre: string;
        telefono: string;
        residencia: string | null;
    };
}) {
    return (
        <>
            <Head title="Editar Mensajero" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={mensajeros.index().url}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Editar Mensajero
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Modifique los datos del mensajero
                        </p>
                    </div>
                </div>

                <form
                    action={mensajeros.update(mensajero).url}
                    method="post"
                    className="flex max-w-xl flex-1 flex-col gap-6"
                >
                    <input type="hidden" name="_method" value="put" />

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="nombre"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Nombre
                                </label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    defaultValue={mensajero.nombre}
                                    placeholder="Nombre completo"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="telefono"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Teléfono
                                </label>
                                <input
                                    id="telefono"
                                    name="telefono"
                                    defaultValue={mensajero.telefono}
                                    placeholder="Número de teléfono"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="residencia"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Residencia
                                </label>
                                <input
                                    id="residencia"
                                    name="residencia"
                                    defaultValue={mensajero.residencia || ''}
                                    placeholder="Dirección de residencia (opcional)"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
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
                            href={mensajeros.index().url}
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

EditMensajero.layout = { breadcrumbs: BREADCRUMBS };
