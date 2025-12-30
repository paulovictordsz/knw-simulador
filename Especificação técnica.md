Aqui está uma Especificação Técnica (Tech Spec) formatada em Markdown, pronta para ser entregue à equipe de desenvolvimento (Antigravity). Este documento estrutura o projeto desde a arquitetura até a lógica de negócios, focado na stack solicitada (Vercel + Supabase + GitHub).

---

# 📄 Especificação Técnica: Simulador de Financiamento KNW

## 1. Visão Geral do Projeto

Desenvolvimento de uma aplicação web para simulação de financiamentos e incentivos fiscais. O objetivo é atuar como uma ferramenta de **Lead Magnet** (atração de leads), permitindo que empresas simulem cenários de crédito e, em troca do resultado, forneçam dados estratégicos para a equipe comercial da KNW.

**Stack Tecnológica:**

* **Frontend:** Next.js (React) + Tailwind CSS (Recomendado para estilização rápida).
* **Backend/Banco de Dados:** Supabase (PostgreSQL).
* **Hospedagem:** Vercel.
* **Repositório:** GitHub.

---

## 2. Arquitetura e Fluxo do Usuário

### Fluxo Sugerido

Para maximizar a conversão, o fluxo deve seguir a lógica de "Entrega de Valor Gradual":

1. **Tela Inicial (Calculadora):** O usuário preenche os dados do financiamento (Valor, Prazo, Linha).
2. **Call-to-Action (CTA):** Ao clicar em "Simular", abre-se o formulário de cadastro (Modal ou Próxima Etapa).
3. **Captura de Lead:** O usuário preenche os dados da empresa e do projeto.
4. **Tela de Resultados:** O sistema exibe o valor da parcela (Tabela Price), total do financiamento e um *disclaimer* legal.
5. **Persistência:** Os dados são salvos no Supabase automaticamente.

---

## 3. Banco de Dados (Supabase)

Deverá ser criada uma tabela chamada `leads_simulacao` para armazenar todas as tentativas de simulação.

### Schema da Tabela: `leads_simulacao`

```sql
create table leads_simulacao (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Dados da Empresa
  razao_social text,
  cnpj text,
  segmento text,
  faturamento_aprox text, -- Pode ser faixa de valor ou numérico
  num_colaboradores int,
  
  -- Dados do Projeto
  tipo_investimento text,
  valor_investimento numeric,
  localizacao_projeto text,
  prazo_desejado text,
  
  -- Dados de Contato
  nome_responsavel text,
  cargo text,
  email text,
  telefone text,
  
  -- Dados da Simulação (Para inteligência comercial)
  linha_credito_selecionada text,
  prazo_financiamento_selecionado int,
  valor_parcela_calculado numeric,
  valor_total_calculado numeric
);

```

**Segurança (RLS - Row Level Security):**

* Habilitar RLS no Supabase.
* Política: `INSERT` permitido para público (anon key).
* Política: `SELECT` permitido apenas para usuários autenticados (Admin da KNW) ou via Dashboard do Supabase.

---

## 4. Lógica da Calculadora (Frontend)

A calculadora deve ser puramente informativa. A lógica deve rodar no *client-side* (navegador) para ser rápida.

### 4.1 Parâmetros de Configuração (Constantes)

O desenvolvedor deve criar um arquivo de configuração (ex: `config/rates.js`) para facilitar ajustes futuros das taxas de juros sem mexer no código complexo.

```javascript
// Exemplo de estrutura de configuração
export const FINANCING_OPTIONS = {
  sources: [
    { id: 'bnb', name: 'BNB', interestRateYear: 0.10 }, // Taxa anual fictícia (ajustar)
    { id: 'bndes', name: 'BNDES', interestRateYear: 0.12 },
    { id: 'finep', name: 'FINEP', interestRateYear: 0.08 },
    { id: 'knw', name: 'Sugestão KNW', interestRateYear: 0.11 },
  ],
  terms: [60, 100, 120, 144] // Meses
};

```

### 4.2 Inputs da Calculadora

1. **Linha de Crédito:** Dropdown (Populado por `FINANCING_OPTIONS.sources`).
2. **Valor Principal:** Input Numérico (Máscara de moeda R$).
3. **Quantidade de Parcelas:** Dropdown (Populado por `FINANCING_OPTIONS.terms`).
4. **Sistema de Amortização:** Input *Read-only* (Travado em "Sistema Price").

### 4.3 Algoritmo de Cálculo (Tabela PRICE)

Utilizar a fórmula financeira de parcelas fixas (PMT):

Onde:

*  = Valor da Parcela
*  = Valor Presente (Valor do Financiamento)
*  = Taxa de juros mensal (Converter a taxa anual da config para mensal: )
*  = Número de parcelas

**Cálculo do Total:**

* 

---

## 5. Interface do Usuário (UI/UX)

### Seção de Formulário (Lead Gen)

Campos obrigatórios para liberar o resultado.

* **Validação:** Validar formato de CNPJ, E-mail e Telefone.
* **Design:** Limpo, profissional, transmitindo autoridade financeira.

### Seção de Resultado (O "Prêmio")

Após o envio do formulário, exibir um "Card de Resultado":

* *Destaque visual para o Valor da Parcela.*
* Exibir o **Valor Total Estimado**.
* **Disclaimer Obrigatório:**
> *"Os valores apresentados são estimativas iniciais baseadas em parâmetros de mercado. Esta simulação não garante aprovação de crédito e não substitui a análise técnica oficial da KNW."*



---

## 6. Integração e Deploy (Passo a Passo)

1. **Setup Inicial:**
* Criar repositório no GitHub `knw-simulador`.
* Iniciar projeto Next.js.
* Instalar cliente Supabase (`@supabase/supabase-js`).


2. **Configuração Supabase:**
* Criar projeto no Supabase.
* Rodar script SQL de criação da tabela.
* Copiar chaves de API (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`).


3. **Desenvolvimento:**
* Criar componente `Calculator`.
* Criar componente `LeadForm`.
* Integrar envio de dados: Ao submeter o form, salvar no Supabase -> Se sucesso -> Exibir Resultado Calculado.


4. **Deploy na Vercel:**
* Conectar Vercel ao repositório GitHub.
* Adicionar as variáveis de ambiente do Supabase no painel da Vercel.
* Deploy em produção.



---

## 7. Próximos Passos (Checklist para Antigravity)

* [ ]  Definir as **Taxas de Juros Médias** para cada linha de crédito (BNB, BNDES, etc.) para que o cálculo seja verossímil.
* [ ]  Providenciar a Logo da KNW e paleta de cores (Hex Codes) para personalização.
* [ ]  Confirmar se o e-mail do lead deve receber uma cópia da simulação (necessita integração com serviço de e-mail transacional, ex: Resend ou SendGrid - *Opcional V2*).