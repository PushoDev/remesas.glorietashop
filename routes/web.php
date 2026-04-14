<?php

use App\Http\Controllers\Clients\ClientController;
use App\Http\Controllers\Mensajeros\MensajeroController;
use App\Http\Controllers\Remesas\RemesaController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('clients', ClientController::class);
    Route::resource('mensajeros', MensajeroController::class);
    Route::resource('remesas', RemesaController::class);
    Route::post('remesas/{remesa}/toggle-entregado', [RemesaController::class, 'toggleEntregado'])->name('remesas.toggle-entregado');
});

require __DIR__.'/settings.php';
