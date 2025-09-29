<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Http\Resources\MaterialResource;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    /**
     * Display a listing of the materials with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,material_type,material_name,raw_casting_price,wrought_casting_price,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Material::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $materials = $query->paginate($perPage, ['*'], 'page', $page);

        return MaterialResource::collection($materials);
    }

    /**
     * Store a newly created material in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'material_type' => 'required|string|max:50',
            'material_name' => 'required|string|max:255',
            'raw_casting_price' => 'required|integer|min:0',
            'wrought_casting_price' => 'required|integer|min:0',
            'raw_casting_loss' => 'nullable|numeric|min:0',
            'wrought_casting_loss' => 'nullable|numeric|min:0',
            'mark_price' => 'nullable|integer|min:0',
            'trade_in_price' => 'nullable|integer|min:0',
            'stub_placement_price' => 'nullable|integer|min:0',
            'stub_removal_price' => 'nullable|integer|min:0',
            'extra_charge' => 'nullable|integer|min:0',
        ]);

        return Material::create($validated);
    }

    /**
     * Display the specified material.
     */
    public function show(string $id)
    {
        return new MaterialResource(Material::findOrFail($id));
    }

    /**
     * Update the specified material in storage.
     */
    public function update(Request $request, string $id)
    {
        $material = Material::findOrFail($id);

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'material_type' => 'required|string|max:50',
            'material_name' => 'required|string|max:255',
            'raw_casting_price' => 'required|integer|min:0',
            'wrought_casting_price' => 'required|integer|min:0',
            'raw_casting_loss' => 'nullable|numeric|min:0',
            'wrought_casting_loss' => 'nullable|numeric|min:0',
            'mark_price' => 'nullable|integer|min:0',
            'trade_in_price' => 'nullable|integer|min:0',
            'stub_placement_price' => 'nullable|integer|min:0',
            'stub_removal_price' => 'nullable|integer|min:0',
            'extra_charge' => 'nullable|integer|min:0',
        ]);

        $material->update($validated);

        return $material;
    }

    /**
     * Remove the specified material from storage.
     */
    public function destroy(string $id)
    {
        $material = Material::findOrFail($id);
        $material->delete();

        return response()->json(['message' => 'Material deleted successfully.']);
    }
}
