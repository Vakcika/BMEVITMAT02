<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \App\Rules\TransactionBillingCycleLimit;
use \App\Rules\DateNotBeforeTransactionDate;
use \App\Rules\SubscriptionConsistency;
use App\Models\Currency;

class TransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'note' => 'nullable|string',
        ];
    }
}
