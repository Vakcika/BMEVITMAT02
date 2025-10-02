<?php

namespace App\Http\Controllers;

use App\Models\GemColor;
use App\Http\Resources\GemColorResource;
use Illuminate\Http\Request;
use App\Http\Requests\GemColorRequest;


class GemColorController extends Controller
{
    /**
     * Display a listing of the gem colors with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,name,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = GemColor::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $colors = $query->paginate($perPage, ['*'], 'page', $page);

        return GemColorResource::collection($colors);
    }

    /**
     * Store a newly created gem color in storage.
     */
    public function store(GemColorRequest $request)
    {
        $validated = $request->validated();

        return GemColor::create($validated);
    }

    /**
     * Display the specified gem color.
     */
    public function show(string $id)
    {
        return new GemColorResource(GemColor::findOrFail($id));
    }

    /**
     * Update the specified gem color in storage.
     */
    public function update(GemColorRequest $request, string $id)
    {
        $validated = $request->validated();

        $color = GemColor::findOrFail($id);


        $color->update($validated);

        return $color;
    }

    /**
     * Remove the specified gem color from storage.
     */
    public function destroy(string $id)
    {
        $color = GemColor::findOrFail($id);
        $color->delete();

        return response()->json(['message' => 'GemColor deleted successfully.']);
    }
}
