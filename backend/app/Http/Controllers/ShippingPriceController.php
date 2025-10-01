<?php

namespace App\Http\Controllers;

use App\Models\ShippingPrice;
use App\Http\Resources\ShippingPriceResource;
use App\Http\Requests\ShippingPriceRequest;
use Illuminate\Http\Request;

class ShippingPriceController extends Controller
{
    /**
     * Display a listing of the shipping prices with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,price,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = ShippingPrice::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $prices = $query->paginate($perPage, ['*'], 'page', $page);

        return ShippingPriceResource::collection($prices);
    }

    /**
     * Store a newly created shipping price in storage.
     */
    public function store(ShippingPriceRequest $request)
    {
        $validated = $request->validated();

        return ShippingPrice::create($validated);
    }

    /**
     * Display the specified shipping price.
     */
    public function show(string $id)
    {
        return new ShippingPriceResource(ShippingPrice::findOrFail($id));
    }

    /**
     * Update the specified shipping price in storage.
     */
    public function update(ShippingPriceRequest $request, string $id)
    {
        $validated = $request->validated();

        $price = ShippingPrice::findOrFail($id);

        $price->update($validated);

        return $price;
    }

    /**
     * Remove the specified shipping price from storage.
     */
    public function destroy(string $id)
    {
        $price = ShippingPrice::findOrFail($id);
        $price->delete();

        return response()->json(['message' => 'ShippingPrice deleted successfully.']);
    }
}
