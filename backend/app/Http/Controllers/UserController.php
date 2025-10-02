<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:id,name,email,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $query = User::query();

        $query->orderBy($validated['sort_by'] ?? 'id', $validated['sort_dir'] ?? 'desc');

        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $users = $query->paginate($perPage, ['*'], 'page', $page);

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return User::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return User::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $type = User::findOrFail($id);
        $type->update($request->validated());
        return $type;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
