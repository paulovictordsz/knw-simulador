'use client';

import { useState } from 'react';
import { maskCNPJ, maskPhone, maskCurrency } from '../lib/masks';

export default function LeadForm({ onSubmit, isUnlocking }) {
    const [formData, setFormData] = useState({
        razao_social: '',
        cnpj: '',
        segmento: '',
        faturamento_aprox: '',
        num_colaboradores: '',
        tipo_investimento: '',
        localizacao_projeto: '',
        nome_responsavel: '',
        cargo: '',
        email: '',
        telefone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let finalValue = value;

        if (name === 'cnpj') {
            finalValue = maskCNPJ(value);
        } else if (name === 'telefone') {
            finalValue = maskPhone(value);
        } else if (name === 'faturamento_aprox') {
            finalValue = maskCurrency(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-fade-in-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Complete seu Cadastro</h2>
                <p className="text-gray-600 mt-2">Para visualizar o resultado detalhado da simulação, precisamos conhecer melhor sua empresa.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados da Empresa */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Dados da Empresa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="razao_social"
                            value={formData.razao_social}
                            placeholder="Razão Social"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                            required
                        />
                        <input
                            type="text"
                            name="cnpj"
                            value={formData.cnpj}
                            placeholder="CNPJ"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                            required
                            maxLength={18}
                        />
                        <input
                            type="text"
                            name="segmento"
                            value={formData.segmento}
                            placeholder="Segmento (ex: Indústria)"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        <input
                            type="text"
                            name="faturamento_aprox"
                            value={formData.faturamento_aprox}
                            placeholder="Faturamento Anual Aprox."
                            onChange={handleChange}
                            maxLength={18}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        <input
                            type="number"
                            name="num_colaboradores"
                            value={formData.num_colaboradores}
                            placeholder="Nº Colaboradores"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                    </div>
                </div>

                {/* Dados do Projeto */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Dados do Projeto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="tipo_investimento"
                            value={formData.tipo_investimento}
                            placeholder="Tipo de Investimento (ex: Máquinas)"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        <input
                            type="text"
                            name="localizacao_projeto"
                            value={formData.localizacao_projeto}
                            placeholder="Localização do Projeto (Cidade/UF)"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                    </div>
                </div>

                {/* Dados de Contato */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-100 pb-2">Contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="nome_responsavel"
                            value={formData.nome_responsavel}
                            placeholder="Seu Nome"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                            required
                        />
                        <input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            placeholder="Seu Cargo"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="E-mail Corporativo"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                            required
                        />
                        <input
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            placeholder="Telefone/WhatsApp"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                            required
                            maxLength={15}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isUnlocking}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
                >
                    {isUnlocking ? 'Processando...' : 'Ver Resultado da Simulação'}
                </button>
            </form>
        </div>
    );
}
