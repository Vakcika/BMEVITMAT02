<?php

namespace App\Http\Controllers;

use App\Models\Gem;
use App\Http\Resources\GemResource;
use App\Http\Requests\GemRequest;
use Illuminate\Http\Request;

class GemController extends Controller
{
    /**
     * Display a listing of the gems with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,size,price,booking_price,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Gem::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $gems = $query->paginate($perPage, ['*'], 'page', $page);

        return GemResource::collection($gems);
    }

    /**
     * Store a newly created gem in storage.
     */
    public function store(GemRequest $request)
    {
        $validated = $request->validated();

        return Gem::create($validated);
    }

    /**
     * Display the specified gem.
     */
    public function show(string $id)
    {
        return new GemResource(Gem::findOrFail($id));
    }

    /**
     * Update the specified gem in storage.
     */
    public function update(GemRequest $request, string $id)
    {

        $validated = $request->validated();
        $gem = Gem::findOrFail($id);

        $gem->update($validated);

        return $gem;
    }

    /**
     * Remove the specified gem from storage.
     */
    public function destroy(string $id)
    {
        $gem = Gem::findOrFail($id);
        $gem->delete();

        return response()->json(['message' => 'Gem deleted successfully.']);
    }
}
