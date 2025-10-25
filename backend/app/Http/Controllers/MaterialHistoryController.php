<?php

namespace App\Http\Controllers;

use App\Models\MaterialHistory;
use App\Http\Resources\MaterialHistoryResource;
use Illuminate\Http\Request;
use App\Http\Requests\MaterialHistoryRequest;


class MaterialHistoryController extends Controller
{
    /**
     * Display a listing of the material histories with pagination and sorting.
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'sort_by' => 'nullable|in:id,material_id,amount,created_at,updated_at',
            'sort_dir' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
            'year' => 'nullable|integer|min:2000|max:' . now()->year,
            'customer' => 'nullable|string|exists:customers,id',
        ]);

        $sortBy = $validated['sort_by'] ?? 'created_at';
        $sortDir = $validated['sort_dir'] ?? 'desc';
        $perPage = $validated['per_page'] ?? 10;
        $page = $validated['page'] ?? 1;

        $query = MaterialHistory::with('material');

        if (!empty($validated['customer'])) {
            $query->where('customer_id', $validated['customer']);
        }

        if (!empty($validated['start_date'])) {
            $query->whereDate('created_at', '>=', $validated['start_date']);
        }
        if (!empty($validated['end_date'])) {
            $query->whereDate('created_at', '<=', $validated['end_date']);
        }

        $histories = (clone $query)
            ->orderBy($sortBy, $sortDir)
            ->paginate($perPage, ['*'], 'page', $page);

        $pageCollection = $histories->getCollection();

        // --- Handle empty result ---
        if ($pageCollection->isEmpty()) {
            return MaterialHistoryResource::collection($histories);
        }

        $oldestOnPage = $pageCollection->min('created_at');

        // --- Gold karat conversion factors (to 999 purity) ---
        $karat_to_999 = [
            '9K'  => 0.375,
            '14K' => 0.585,
            '18K' => 0.750,
            '999' => 1.0,
        ];

        // --- Base balances before current page ---
        if (is_null($oldestOnPage)) {
            $previousBalances = collect();
        } else {
            // --- Base balances before current page ---
            $previousBalances = (clone $query)
                ->where('created_at', '<', $oldestOnPage)
                ->get()
                ->groupBy(fn($h) => $h->material->type)
                ->map(fn($group) => round($group->sum('amount'), 2));
        }

        $runningBalances = $previousBalances->toArray();

        $chronologicalPage = $pageCollection->sortBy('created_at')->values();

        $chronologicalPage = $chronologicalPage->map(function ($history) use (&$runningBalances, $karat_to_999) {
            $type = $history->material->type;
            $amount = $history->amount;

            // --- Initialize if missing ---
            if (!isset($runningBalances[$type])) {
                $runningBalances[$type] = 0;
            }

            // --- Update native type balance ---
            $runningBalances[$type] = round($runningBalances[$type] + $amount, 2);

            // --- Compute gold 14K equivalent total ---
            $totalGold14k = 0;
            foreach ($runningBalances as $t => $val) {
                if (isset($karat_to_999[$t])) {
                    $amount_in_999 = $val * $karat_to_999[$t];
                    $gold_in_14k = $amount_in_999 / $karat_to_999['14K'];
                    $totalGold14k += $gold_in_14k;
                }
            }

            // --- Build display balances ---
            $displayBalances = [];

            // Keep raw per-type balances
            foreach ($runningBalances as $t => $val) {
                $displayBalances[$t] = round($val, 2);
            }

            // --- Compute derived gold-equivalent totals ---
            $gold_equivalents = [];
            $total_gold_14k_eq = 0;

            foreach ($runningBalances as $t => $val) {
                if (isset($karat_to_999[$t])) {
                    // Convert this gold type’s native balance into 14K-equivalent weight
                    $amount_in_999 = $val * $karat_to_999[$t];
                    $gold_in_14k = $amount_in_999 / $karat_to_999['14K'];
                    $gold_equivalents[$t] = round($gold_in_14k, 2);
                    $total_gold_14k_eq += $gold_in_14k;
                }
            }

            // Add summary fields
            $displayBalances['gold_equivalents'] = $gold_equivalents;
            $displayBalances['total_gold_14k_equivalent'] = round($total_gold_14k_eq, 2);

            $history->balances = $displayBalances;

            return $history;
        });

        if ($sortDir === 'desc') {
            $chronologicalPage = $chronologicalPage->sortByDesc('created_at')->values();
        }

        $histories->setCollection($chronologicalPage);

        return MaterialHistoryResource::collection($histories);
    }



    /**
     * Store a newly created material history in storage.
     */
    public function store(MaterialHistoryRequest $request)
    {
        $validated = $request->validated();

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
    public function update(MaterialHistoryRequest $request, string $id)
    {
        $validated = $request->validated();

        $history = MaterialHistory::findOrFail($id);

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
