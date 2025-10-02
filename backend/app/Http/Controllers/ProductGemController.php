<?php

namespace App\Http\Controllers;

use App\Models\ProductGem;
use App\Http\Resources\ProductGemResource;
use Illuminate\Http\Request;
use App\Http\Requests\ProductGemRequest;


class ProductGemController extends Controller
{
    /**
     * Display a listing of the product-gems with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,product_id,gem_id,count,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = ProductGem::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $items = $query->paginate($perPage, ['*'], 'page', $page);

        return ProductGemResource::collection($items);
    }

    /**
     * Store a newly created product-gem in storage.
     */
    public function store(ProductGemRequest $request)
    {
        $validated = $request->validated();

        return ProductGem::create($validated);
    }

    /**
     * Display the specified product-gem.
     */
    public function show(string $id)
    {
        return new ProductGemResource(ProductGem::findOrFail($id));
    }

    /**
     * Update the specified product-gem in storage.
     */
    public function update(ProductGemRequest $request, string $id)
    {
        $validated = $request->validated();

        $item = ProductGem::findOrFail($id);


        $item->update($validated);

        return $item;
    }

    /**
     * Remove the specified product-gem from storage.
     */
    public function destroy(string $id)
    {
        $item = ProductGem::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'ProductGem deleted successfully.']);
    }
}
