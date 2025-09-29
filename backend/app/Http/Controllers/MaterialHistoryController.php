<?php

namespace App\Http\Controllers;

use App\Models\MaterialHistory;
use App\Http\Resources\MaterialHistoryResource;
use Illuminate\Http\Request;

class MaterialHistoryController extends Controller
{
    /**
     * Display a listing of the material histories with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,material_id,old_price,new_price,changed_at,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = MaterialHistory::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $histories = $query->paginate($perPage, ['*'], 'page', $page);

        return MaterialHistoryResource::collection($histories);
    }

    /**
     * Store a newly created material history in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'old_price' => 'required|integer|min:0',
            'new_price' => 'required|integer|min:0',
            'changed_at' => 'required|date',
        ]);

        return MaterialHistory::create($validated);
    }

    /**
     * Display the specified material history.
     */
    public function show(string $id)
    {
        return new MaterialHistoryResource(MaterialHistory::findOrFail($id));
    }

    /**
     * Update the specified material history in storage.
     */
    public function update(Request $request, string $id)
    {
        $history = MaterialHistory::findOrFail($id);

        $validated = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'old_price' => 'required|integer|min:0',
            'new_price' => 'required|integer|min:0',
            'changed_at' => 'required|date',
        ]);

        $history->update($validated);

        return $history;
    }

    /**
     * Remove the specified material history from storage.
     */
    public function destroy(string $id)
    {
        $history = MaterialHistory::findOrFail($id);
        $history->delete();

        return response()->json(['message' => 'MaterialHistory deleted successfully.']);
    }
}
