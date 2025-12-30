/**
 * Converte taxa anual para taxa mensal composta.
 * @param {number} annualRate - Taxa anual (ex: 0.10 para 10%)
 * @returns {number} Taxa mensal
 */
export function convertAnnualToMonthlyRate(annualRate) {
    return Math.pow(1 + annualRate, 1 / 12) - 1;
}

/**
 * Calcula a parcela (PMT) usando a Tabela Price.
 * Fórmula: PMT = PV * [ i(1+i)^n ] / [ (1+i)^n - 1 ]
 * @param {number} principal - Valor financiado (PV)
 * @param {number} monthlyRate - Taxa de juros mensal (i)
 * @param {number} totalMonths - Prazo em meses (n)
 * @returns {number} Valor da parcela
 */
export function calculatePMT(principal, monthlyRate, totalMonths) {
    if (monthlyRate === 0) return principal / totalMonths;

    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const pmt = principal * (monthlyRate * factor) / (factor - 1);
    return pmt;
}

/**
 * Calcula o custo total do financiamento.
 * @param {number} pmt - Valor da parcela
 * @param {number} totalMonths - Prazo em meses
 * @returns {number} Valor total pago
 */
export function calculateTotalPayment(pmt, totalMonths) {
    return pmt * totalMonths;
}
