<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use App\Http\Requests\OrderRequest;


class OrderController extends Controller
{
    /**
     * Display a listing of the orders with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,customer_id,product_id,order_date,status,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Order::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $orders = $query->paginate($perPage, ['*'], 'page', $page);

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(OrderRequest $request)
    {
        $validated = $request->validated();

        return Order::create($validated);
    }

    /**
     * Display the specified order.
     */
    public function show(string $id)
    {
        return new OrderResource(Order::findOrFail($id));
    }

    /**
     * Update the specified order in storage.
     */
    public function update(OrderRequest $request, string $id)
    {
        $validated = $request->validated();

        $order = Order::findOrFail($id);

        $order->update($validated);

        return $order;
    }

    /**
     * Remove the specified order from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully.']);
    }
}
