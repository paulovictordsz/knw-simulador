-- Enable UUID extension
create extension if not exists "uuid-ossp";

create table leads_simulacao (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Dados da Empresa
  razao_social text,
  cnpj text,
  segmento text,
  faturamento_aprox text,
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

-- Row Level Security (RLS)
alter table leads_simulacao enable row level security;

-- Policy: INSERT for everyone (anon)
create policy "Anon can insert leads"
  on leads_simulacao for insert
  with check (true);

-- Policy: SELECT for authenticated users database admins
-- Note: In a real app, you might restrict this further.
create policy "Authenticated users can select leads"
  on leads_simulacao for select
  using (auth.role() = 'authenticated');
