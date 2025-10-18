<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Http\Resources\TransactionResource;
use App\Http\Requests\TransactionRequest;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'year' => 'nullable|integer|min:2000|max:' . now()->year,
            'customer' => 'nullable|string|exists:customers,id',
            'sort_by' => 'nullable|in:amount,amount_in_base,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ]);

        $sortBy = $validated['sort_by'] ?? 'created_at';
        $sortDir = $validated['sort_dir'] ?? 'desc';
        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        // Base query with filters
        $query = Transaction::query();

        if (!empty($validated['year'])) {
            $query->whereYear('created_at', $validated['year']);
        }

        if (!empty($validated['customer'])) {
            $query->where('customer_id', $validated['customer']);
        }

        // Get paginated result
        $transactions = (clone $query)
            ->orderBy($sortBy, $sortDir)
            ->paginate($perPage, ['*'], 'page', $page);

        $pageCollection = $transactions->getCollection();

        // Find the oldest transaction on this page (chronologically)
        $oldestOnPage = $pageCollection->min('created_at');

        // Compute base balance = sum of all transactions older than that
        $baseBalance = (clone $query)
            ->where('created_at', '<', $oldestOnPage)
            ->sum('amount');

        // Compute running balance within page (always ascending)
        $running = round($baseBalance, 2);
        $chronologicalPage = $pageCollection->sortBy('created_at')->values();

        $chronologicalPage = $chronologicalPage->map(function ($transaction) use (&$running) {
            $running = round($running + $transaction->amount, 2);
            $transaction->balance = $running;
            return $transaction;
        });

        // Restore requested order
        if ($sortDir === 'desc') {
            $chronologicalPage = $chronologicalPage->sortByDesc('created_at')->values();
        }

        $transactions->setCollection($chronologicalPage);

        return TransactionResource::collection($transactions);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        $validated = $request->validated();
        return Transaction::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new TransactionResource(Transaction::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TransactionRequest $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->validated());
        return $transaction;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted.']);
    }

    /**
     * Get all years for transactions
     */
    public function getTransactionYears()
    {
        $query = Transaction::query()
            ->selectRaw('DISTINCT strftime(\'%Y\', created_at) as year');

        $years = $query->orderBy('year', 'desc')
            ->get()
            ->pluck('year')
            ->toArray();

        return response()->json([
            'years' => $years
        ]);
    }
}
