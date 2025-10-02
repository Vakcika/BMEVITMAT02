<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Http\Resources\ProductCategoryResource;
use Illuminate\Http\Request;
use App\Http\Requests\ProductCategoryRequest;


class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the product categories with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,name,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = ProductCategory::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $categories = $query->paginate($perPage, ['*'], 'page', $page);

        return ProductCategoryResource::collection($categories);
    }

    /**
     * Store a newly created product category in storage.
     */
    public function store(ProductCategoryRequest $request)
    {
        $validated = $request->validated();

        return ProductCategory::create($validated);
    }

    /**
     * Display the specified product category.
     */
    public function show(string $id)
    {
        return new ProductCategoryResource(ProductCategory::findOrFail($id));
    }

    /**
     * Update the specified product category in storage.
     */
    public function update(ProductCategoryRequest $request, string $id)
    {
        $validated = $request->validated();

        $category = ProductCategory::findOrFail($id);

        $category->update($validated);

        return $category;
    }

    /**
     * Remove the specified product category from storage.
     */
    public function destroy(string $id)
    {
        $category = ProductCategory::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'ProductCategory deleted successfully.']);
    }
}
