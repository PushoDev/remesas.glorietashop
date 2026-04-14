<?php

namespace App\Http\Controllers\Mensajeros;

use App\Http\Controllers\Controller;
use App\Http\Requests\Mensajeros\StoreMensajeroRequest;
use App\Http\Requests\Mensajeros\UpdateMensajeroRequest;
use App\Models\Mensajero;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MensajeroController extends Controller
{
    /**
     * Display a listing of mensajeros.
     */
    public function index(Request $request): Response
    {
        $mensajeros = Mensajero::query()
            ->when($request->search, function ($query, $search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('telefono', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('mensajeros/index', [
            'mensajeros' => $mensajeros,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new mensajero.
     */
    public function create(): Response
    {
        return Inertia::render('mensajeros/create');
    }

    /**
     * Store a newly created mensajero.
     */
    public function store(StoreMensajeroRequest $request): RedirectResponse
    {
        Mensajero::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Mensajero creado exitosamente.']);

        return to_route('mensajeros.index');
    }

    /**
     * Show the form for editing the specified mensajero.
     */
    public function edit(Mensajero $mensajero): Response
    {
        return Inertia::render('mensajeros/edit', [
            'mensajero' => $mensajero,
        ]);
    }

    /**
     * Update the specified mensajero.
     */
    public function update(UpdateMensajeroRequest $request, Mensajero $mensajero): RedirectResponse
    {
        $mensajero->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Mensajero actualizado exitosamente.']);

        return to_route('mensajeros.index');
    }

    /**
     * Remove the specified mensajero.
     */
    public function destroy(Mensajero $mensajero): RedirectResponse
    {
        $mensajero->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Mensajero eliminado exitosamente.']);

        return to_route('mensajeros.index');
    }
}
