<?php

namespace App\Http\Controllers;

use App\Models\GemShape;
use App\Http\Resources\GemShapeResource;
use Illuminate\Http\Request;
use App\Http\Requests\GemColorRequest;


class GemShapeController extends Controller
{
    /**
     * Display a listing of the gem shapes with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,name,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = GemShape::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $shapes = $query->paginate($perPage, ['*'], 'page', $page);

        return GemShapeResource::collection($shapes);
    }

    /**
     * Store a newly created gem shape in storage.
     */
    public function store(GemColorRequest $request)
    {
        $validated = $request->validated();

        return GemShape::create($validated);
    }

    /**
     * Display the specified gem shape.
     */
    public function show(string $id)
    {
        return new GemShapeResource(GemShape::findOrFail($id));
    }

    /**
     * Update the specified gem shape in storage.
     */
    public function update(GemColorRequest $request, string $id)
    {
        $validated = $request->validated();

        $shape = GemShape::findOrFail($id);

        $shape->update($validated);

        return $shape;
    }

    /**
     * Remove the specified gem shape from storage.
     */
    public function destroy(string $id)
    {
        $shape = GemShape::findOrFail($id);
        $shape->delete();

        return response()->json(['message' => 'GemShape deleted successfully.']);
    }
}
