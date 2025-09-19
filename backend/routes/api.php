<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TransactionController;


// Public routes
Route::post('/login', [AuthController::class, 'login']);

Route::get('/session', function () {
    return response()->json(session());
});

// Sanctum-protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Users
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [CustomerController::class, 'store']);
    Route::get('/users/{id}', [CustomerController::class, 'show']);
    Route::put('/users/{id}', [CustomerController::class, 'update']);
    Route::delete('/users/{id}', [CustomerController::class, 'destroy']);

    // Customers
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    // Transactions
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});
