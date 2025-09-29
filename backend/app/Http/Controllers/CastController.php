<?php

namespace App\Http\Controllers;

use App\Models\Cast;
use App\Http\Resources\CastResource;
use Illuminate\Http\Request;

class CastController extends Controller
{
    /**
     * Display a listing of the casts with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,material_id,weight,casting_date,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Cast::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $casts = $query->paginate($perPage, ['*'], 'page', $page);

        return CastResource::collection($casts);
    }

    /**
     * Store a newly created cast in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'weight' => 'required|numeric|min:0',
            'casting_date' => 'required|date',
        ]);

        return Cast::create($validated);
    }

    /**
     * Display the specified cast.
     */
    public function show(string $id)
    {
        return new CastResource(Cast::findOrFail($id));
    }

    /**
     * Update the specified cast in storage.
     */
    public function update(Request $request, string $id)
    {
        $cast = Cast::findOrFail($id);

        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'weight' => 'required|numeric|min:0',
            'casting_date' => 'required|date',
        ]);

        $cast->update($validated);

        return $cast;
    }

    /**
     * Remove the specified cast from storage.
     */
    public function destroy(string $id)
    {
        $cast = Cast::findOrFail($id);
        $cast->delete();

        return response()->json(['message' => 'Cast deleted successfully.']);
    }
}
