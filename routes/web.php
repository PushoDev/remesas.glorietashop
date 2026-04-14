<?php

use App\Http\Controllers\Clients\ClientController;
use App\Http\Controllers\Mensajeros\MensajeroController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('clients', ClientController::class);
    Route::resource('mensajeros', MensajeroController::class);
});

require __DIR__.'/settings.php';
