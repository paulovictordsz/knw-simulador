'use client';

import { useState } from 'react';
import { FINANCING_OPTIONS } from '../config/rates';

export default function Calculator({ onSimulate }) {
    const [formData, setFormData] = useState({
        sourceIndex: '0',
        amount: '',
        termIndex: '0',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount) return;

        // Pass data back to parent
        onSimulate({
            source: FINANCING_OPTIONS.sources[parseInt(formData.sourceIndex)],
            amount: parseFloat(formData.amount),
            term: FINANCING_OPTIONS.terms[parseInt(formData.termIndex)],
        });
    };

    return (
        <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Simule Agora</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Linha de Crédito */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Linha de Crédito
                    </label>
                    <select
                        name="sourceIndex"
                        value={formData.sourceIndex}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-gray-50"
                    >
                        {FINANCING_OPTIONS.sources.map((source, idx) => (
                            <option key={source.id} value={idx}>
                                {source.name} ({(source.interestRateYear * 100).toFixed(0)}% a.a.)
                            </option>
                        ))}
                    </select>
                </div>

                {/* Valor do Investimento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor do Investimento (R$)
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Ex: 500000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-gray-50"
                        min="1000"
                        required
                    />
                </div>

                {/* Prazo (Meses) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Parcelas
                    </label>
                    <select
                        name="termIndex"
                        value={formData.termIndex}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-gray-50"
                    >
                        {FINANCING_OPTIONS.terms.map((term, idx) => (
                            <option key={idx} value={idx}>
                                {term} meses
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amortização (Read-only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sistema de Amortização
                    </label>
                    <input
                        type="text"
                        value="Tabela Price (Parcelas Fixas)"
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98]"
                >
                    Simular Financiamento
                </button>
            </form>
        </div>
    );
}
