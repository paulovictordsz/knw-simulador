export const maskCurrency = (value) => {
    if (!value) return '';

    // Remove tudo que não é dígito
    const numericValue = value.replace(/\D/g, '');

    if (!numericValue) return '';

    // Converte para decimal (divide por 100)
    const amount = parseFloat(numericValue) / 100;

    // Formata para BRL
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(amount);
};

export const currencyToNumber = (value) => {
    if (!value) return 0;
    if (typeof value === 'number') return value;

    // Remove R$, pontos e substitui vírgula por ponto
    const numericString = value.replace(/\D/g, '');
    return parseFloat(numericString) / 100;
};

export const maskCNPJ = (value) => {
    if (!value) return '';

    // 00.000.000/0000-00
    return value
        .replace(/\D/g, '') // Remove não números
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskPhone = (value) => {
    if (!value) return '';

    // (00) 00000-0000
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
};
