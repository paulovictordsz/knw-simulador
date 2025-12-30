'use client';

import { useState } from 'react';
import Calculator from '../components/Calculator';
import LeadForm from '../components/LeadForm';
import ResultCard from '../components/ResultCard';
import { supabase } from '../lib/supabaseClient';
import { convertAnnualToMonthlyRate, calculatePMT, calculateTotalPayment } from '../lib/simulationLogic';

export default function Home() {
  const [step, setStep] = useState('calculator'); // calculator, lead, result
  const [simulationParams, setSimulationParams] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Calculator submits
  const handleSimulation = (params) => {
    setSimulationParams(params);
    setStep('lead');
  };

  // Step 2: Lead Form submits
  const handleLeadSubmit = async (leadData) => {
    setIsSubmitting(true);

    try {
      // 1. Calculate final results
      const { amount, term, source } = simulationParams;
      const rateYear = source.interestRateYear;
      const rateMonth = convertAnnualToMonthlyRate(rateYear);
      const monthlyPayment = calculatePMT(amount, rateMonth, term);
      const totalPayment = calculateTotalPayment(monthlyPayment, term);

      // 2. Prepare payload for Supabase
      const payload = {
        // Lead Data
        ...leadData,
        num_colaboradores: leadData.num_colaboradores ? parseInt(leadData.num_colaboradores) : null,
        valor_investimento: leadData.valor_investimento ? parseFloat(leadData.valor_investimento) : null, // If collected in form, otherwise from params? Form has it? No, form has type/location but not value? Ah, form input names matched schema.

        // Ensure numeric fields from params if not in form
        // The form has 'valor_investimento' input, but maybe user wants same as simulation?
        // Let's rely on form data if present, or fallback. 
        // Actually, schema has valor_investimento. 
        // We will save the simulation 'amount' as 'valor_investimento' if form is empty or overwrite? 
        // Let's trust form. If form doesn't have it filled, we use simulation amount.
        valor_investimento: leadData.valor_investimento || amount,

        // Simulation Data
        linha_credito_selecionada: source.name,
        prazo_financiamento_selecionado: term,
        valor_parcela_calculado: monthlyPayment,
        valor_total_calculado: totalPayment
      };

      // 3. Insert into Supabase
      const { error } = await supabase
        .from('leads_simulacao')
        .insert([payload]);

      if (error) {
        console.error('Error saving lead:', error);
        alert(`Erro ao salvar: ${error.message || 'Desconhecido'} \nDetalhes: ${error.details || ''} \nHint: ${error.hint || ''}`);
        setIsSubmitting(false);
        return;
      }

      // 4. Show results
      setFinalResult({
        monthlyPayment,
        totalPayment,
        amount,
        term,
        rateYear,
        sourceName: source.name
      });
      setStep('result');

    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Erro inesperado. Contate o suporte.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 text-gray-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-gray-200">

      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <header className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 mb-4">
            KNW Simulador
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Simule seu financiamento e descubra as melhores condições para impulsionar sua empresa.
          </p>
        </header>

        {/* Dynamic Content */}
        <div className="w-full flex justify-center">
          {step === 'calculator' && (
            <div className="animate-fade-in-up w-full flex justify-center">
              <Calculator onSimulate={handleSimulation} />
            </div>
          )}

          {step === 'lead' && (
            <div className="w-full flex justify-center">
              <LeadForm onSubmit={handleLeadSubmit} isUnlocking={isSubmitting} />
            </div>
          )}

          {step === 'result' && (
            <div className="w-full flex justify-center">
              <ResultCard result={finalResult} />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} KNW. Todos os direitos reservados.
        </footer>
      </div>
    </main>
  );
}
