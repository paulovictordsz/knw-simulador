'use client';

export default function ResultCard({ result }) {
    if (!result) return null;

    const {
        monthlyPayment,
        totalPayment,
        amount,
        term,
        rateYear,
        sourceName
    } = result;

    const formatCurrency = (value) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl p-8 animate-fade-in relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

            <h2 className="text-2xl font-light text-gray-300 mb-6">Resultado da Simulação</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <p className="text-sm text-gray-400 mb-1">Valor da Parcela Mensal (Estimado)</p>
                    <p className="text-4xl font-bold text-green-400">{formatCurrency(monthlyPayment)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 mb-1">Valor Total do Financiamento</p>
                    <p className="text-2xl font-semibold text-white">{formatCurrency(totalPayment)}</p>
                </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">Linha de Crédito</span>
                    <span className="font-medium">{sourceName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Taxa de Juros (a.a.)</span>
                    <span className="font-medium">{(rateYear * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Prazo</span>
                    <span className="font-medium">{term} meses</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Valor Captado</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500 italic">
                <p>
                    * Os valores apresentados são estimativas iniciais baseadas em parâmetros de mercado.
                    Esta simulação não garante aprovação de crédito e não substitui a análise técnica oficial da KNW.
                </p>
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={() => window.location.reload()}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                    Fazer nova simulação
                </button>
            </div>
        </div>
    );
}
