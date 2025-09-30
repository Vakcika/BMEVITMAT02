<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the products with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,weight,size,created_at,updated_at',
            'category' => 'nullable|string|exists:product_categories,name',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Product::query();

        if (!empty($validated['category'])) {
            $query->whereHas('category', function ($q) use ($validated) {
                $q->where('name', $validated['category']);
            });
        }

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $products = $query->paginate($perPage, ['*'], 'page', $page);

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'gem_id' => 'nullable|exists:gems,id',
            'weight' => 'required|numeric|min:0',
            'size' => 'required|string|max:255',
            'image_url' => 'nullable|url',
            'notes' => 'nullable|string',
        ]);

        return Product::create($validated);
    }

    /**
     * Display the specified product.
     */
    public function show(string $id)
    {
        return new ProductResource(Product::findOrFail($id));
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'gem_id' => 'nullable|exists:gems,id',
            'weight' => 'required|numeric|min:0',
            'size' => 'required|string|max:255',
            'image_url' => 'nullable|url',
            'notes' => 'nullable|string',
        ]);

        $product->update($validated);

        return $product;
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }
}
