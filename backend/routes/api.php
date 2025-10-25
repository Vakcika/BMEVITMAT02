<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\GemController;
use App\Http\Controllers\ProductGemController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CastController;
use App\Http\Controllers\MaterialHistoryController;
use App\Http\Controllers\ShippingPriceController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\GemShapeController;
use App\Http\Controllers\GemColorController;
use App\Http\Controllers\RoleController;


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
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

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

    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Gems
    Route::get('/gems', [GemController::class, 'index']);
    Route::post('/gems', [GemController::class, 'store']);
    Route::get('/gems/{id}', [GemController::class, 'show']);
    Route::put('/gems/{id}', [GemController::class, 'update']);
    Route::delete('/gems/{id}', [GemController::class, 'destroy']);

    // ProductGems (pivot)
    Route::get('/product-gems', [ProductGemController::class, 'index']);
    Route::post('/product-gems', [ProductGemController::class, 'store']);
    Route::get('/product-gems/{id}', [ProductGemController::class, 'show']);
    Route::put('/product-gems/{id}', [ProductGemController::class, 'update']);
    Route::delete('/product-gems/{id}', [ProductGemController::class, 'destroy']);

    // Materials
    Route::get('/materials', [MaterialController::class, 'index']);
    Route::post('/materials', [MaterialController::class, 'store']);
    Route::get('/materials/{id}', [MaterialController::class, 'show']);
    Route::put('/materials/{id}', [MaterialController::class, 'update']);
    Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    // Casts
    Route::get('/casts', [CastController::class, 'index']);
    Route::post('/casts', [CastController::class, 'store']);
    Route::get('/casts/{id}', [CastController::class, 'show']);
    Route::put('/casts/{id}', [CastController::class, 'update']);
    Route::delete('/casts/{id}', [CastController::class, 'destroy']);

    // MaterialHistory
    Route::get('/material-history', [MaterialHistoryController::class, 'index']);
    Route::post('/material-history', [MaterialHistoryController::class, 'store']);
    Route::get('/material-history/{id}', [MaterialHistoryController::class, 'show']);
    Route::put('/material-history/{id}', [MaterialHistoryController::class, 'update']);
    Route::delete('/material-history/{id}', [MaterialHistoryController::class, 'destroy']);

    // ShippingPrices
    Route::get('/shipping-prices', [ShippingPriceController::class, 'index']);
    Route::post('/shipping-prices', [ShippingPriceController::class, 'store']);
    Route::get('/shipping-prices/{id}', [ShippingPriceController::class, 'show']);
    Route::put('/shipping-prices/{id}', [ShippingPriceController::class, 'update']);
    Route::delete('/shipping-prices/{id}', [ShippingPriceController::class, 'destroy']);

    // ProductCategories
    Route::get('/product-categories', [ProductCategoryController::class, 'index']);
    Route::post('/product-categories', [ProductCategoryController::class, 'store']);
    Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show']);
    Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update']);
    Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy']);

    // GemShapes
    Route::get('/gem-shapes', [GemShapeController::class, 'index']);
    Route::post('/gem-shapes', [GemShapeController::class, 'store']);
    Route::get('/gem-shapes/{id}', [GemShapeController::class, 'show']);
    Route::put('/gem-shapes/{id}', [GemShapeController::class, 'update']);
    Route::delete('/gem-shapes/{id}', [GemShapeController::class, 'destroy']);

    // GemColors
    Route::get('/gem-colors', [GemColorController::class, 'index']);
    Route::post('/gem-colors', [GemColorController::class, 'store']);
    Route::get('/gem-colors/{id}', [GemColorController::class, 'show']);
    Route::put('/gem-colors/{id}', [GemColorController::class, 'update']);
    Route::delete('/gem-colors/{id}', [GemColorController::class, 'destroy']);

    // Roles
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);
});
