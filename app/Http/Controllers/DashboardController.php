<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Remesa;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $clientesCount = Client::count();

        $remesasEntregadasCount = Remesa::where('entregado', true)->count();

        $fondosAdquiridos = Remesa::sum('monto_envio');

        $clientesConRemesas = Client::select('clients.*')
            ->selectRaw('COUNT(remesas.id) as total_remesas')
            ->leftJoin('remesas', 'clients.id', '=', 'remesas.cliente_id')
            ->groupBy('clients.id')
            ->orderByDesc('total_remesas')
            ->limit(10)
            ->get();

        $mensajerosConRemesas = DB::table('mensajeros')
            ->select('mensajeros.*')
            ->selectRaw('COUNT(CASE WHEN remesas.entregado = 1 THEN 1 END) as remesas_entregadas')
            ->leftJoin('remesas', 'mensajeros.id', '=', 'remesas.mensajero_id')
            ->groupBy('mensajeros.id')
            ->orderByDesc('remesas_entregadas')
            ->limit(10)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'clientes' => $clientesCount,
                'remesas_entregadas' => $remesasEntregadasCount,
                'fondos_adquiridos' => round($fondosAdquiridos, 2),
            ],
            'clientesConRemesas' => $clientesConRemesas,
            'mensajerosConRemesas' => $mensajerosConRemesas,
        ]);
    }
}
