<?php

namespace App\Http\Controllers\Remesas;

use App\Http\Controllers\Controller;
use App\Http\Requests\Remesas\StoreRemesaRequest;
use App\Http\Requests\Remesas\UpdateRemesaRequest;
use App\Models\Client;
use App\Models\Mensajero;
use App\Models\Remesa;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RemesaController extends Controller
{
    public function index(Request $request): Response
    {
        $remesas = Remesa::with(['cliente', 'mensajero'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('cliente', function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%");
                })
                    ->orWhere('nombre_beneficiario', 'like', "%{$search}%")
                    ->orWhere('telefono_beneficiario', 'like', "%{$search}%");
            })
            ->when($request->estado, function ($query, $estado) {
                $query->where('entregado', $estado === 'entregado');
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('remesas/index', [
            'remesas' => $remesas,
            'filters' => $request->only(['search', 'estado']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('remesas/create', [
            'clientes' => Client::orderBy('nombre')->get(['id', 'nombre', 'telefono']),
            'mensajeros' => Mensajero::orderBy('nombre')->get(['id', 'nombre']),
        ]);
    }

    public function store(StoreRemesaRequest $request): RedirectResponse
    {
        Remesa::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Remesa creada exitosamente.']);

        return to_route('remesas.index');
    }

    public function edit(Remesa $remesa): Response
    {
        if ($remesa->entregado) {
            return Inertia::render('remesas/show', [
                'remesa' => $remesa->load(['cliente', 'mensajero']),
            ]);
        }

        return Inertia::render('remesas/edit', [
            'remesa' => $remesa->load(['cliente', 'mensajero']),
            'clientes' => Client::orderBy('nombre')->get(['id', 'nombre', 'telefono']),
            'mensajeros' => Mensajero::orderBy('nombre')->get(['id', 'nombre']),
        ]);
    }

    public function show(Remesa $remesa): Response
    {
        return Inertia::render('remesas/show', [
            'remesa' => $remesa->load(['cliente', 'mensajero']),
        ]);
    }

    public function update(UpdateRemesaRequest $request, Remesa $remesa): RedirectResponse
    {
        if ($remesa->entregado) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'No se puede editar una remesa entregada.']);

            return to_route('remesas.index');
        }

        $remesa->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Remesa actualizada exitosamente.']);

        return to_route('remesas.index');
    }

    public function destroy(Remesa $remesa): RedirectResponse
    {
        $remesa->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Remesa eliminada exitosamente.']);

        return to_route('remesas.index');
    }

    public function toggleEntregado(Remesa $remesa): RedirectResponse
    {
        $remesa->update(['entregado' => ! $remesa->entregado]);

        $mensaje = $remesa->entregado ? 'Remesa marcada como entregada.' : 'Remesa marcada como en proceso.';

        Inertia::flash('toast', ['type' => 'success', 'message' => $mensaje]);

        return to_route('remesas.index');
    }
}
