<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the roles with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,name,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = Role::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $roles = $query->paginate($perPage, ['*'], 'page', $page);

        return RoleResource::collection($roles);
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(RoleRequest $request)
    {
        $validated = $request->validated();

        return Role::create($validated);
    }

    /**
     * Display the specified role.
     */
    public function show(string $id)
    {
        return new RoleResource(Role::findOrFail($id));
    }

    /**
     * Update the specified role in storage.
     */
    public function update(RoleRequest $request, string $id)
    {
        $validated = $request->validated();

        $role = Role::findOrFail($id);

        $role->update($validated);

        return $role;
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json(['message' => 'Role deleted successfully.']);
    }
}
