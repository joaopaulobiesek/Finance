# 💰 Financeiro

Sistema de controle financeiro simples e completo para gerenciar receitas, despesas e parcelas.

## 📋 O que é?

Um sistema financeiro **offline** (roda no navegador sem precisar de internet) que permite:

- ✅ Registrar receitas e despesas
- ✅ Dividir lançamentos em parcelas automáticas
- ✅ Controlar vencimentos e competências
- ✅ Separar gastos da empresa e pessoais
- ✅ Acompanhar status de pagamentos
- ✅ Gerar relatórios e exportar dados

## 🤖 Desenvolvido por IA

Este projeto foi **100% desenvolvido por Inteligência Artificial** (Claude) para resolver problemas financeiros do dia a dia de forma simples e prática.

O sistema foi criado para ser:
- **Fácil de usar** - Interface intuitiva
- **Flexível** - Totalmente personalizável
- **Sem servidor** - Todos os dados ficam no seu navegador
- **Sem instalação** - Basta abrir o arquivo HTML

## 🚀 Como usar?

1. Abra o arquivo `index.html` no navegador
2. Comece a adicionar seus lançamentos
3. Pronto! Seus dados ficam salvos localmente

## ⚙️ Como personalizar?

Todas as configurações podem ser editadas no arquivo **`script.js`**:

### 📂 Categorias
```javascript
categorias: [
    {id: 1, nome: "Receita - Serviços", tipo: "receita", ativo: true},
    {id: 10, nome: "Despesa - Pessoal", tipo: "despesa", ativo: true},
    // Adicione suas próprias categorias aqui
]
```

### 🏷️ Tipos
```javascript
tipos: [
    {id: 1, nome: "Empresa", cor: "#2196F3", ativo: true},
    {id: 2, nome: "Pessoal - Sócio 1", cor: "#FF9800", ativo: true},
    // Personalize os tipos de acordo com sua necessidade
]
```

### 📊 Status
```javascript
status: [
    {id: 1, nome: "Pago", cor: "#4CAF50", icone: "✅", ativo: true},
    {id: 2, nome: "Não Pago", cor: "#f44336", icone: "❌", ativo: true},
    // Adicione novos status se precisar
]
```

### 💳 Opções de Parcelas
```javascript
opcoesParcelas: [
    {valor: 1, texto: "À vista"},
    {valor: 12, texto: "12x"},
    {valor: 24, texto: "24x"},
    // Adicione mais opções de parcelamento
]
```

## 📁 Estrutura do Projeto

```
sistema/
├── index.html              # Página principal (menu)
├── lancamentos.html        # Gerenciar lançamentos
├── dashboard.html          # Visão geral financeira
├── relatorios.html         # Relatórios detalhados
├── despesas-pessoais.html  # Controle de gastos pessoais
├── config.html             # Configurações do sistema
├── script.js               # ⚙️ ARQUIVO DE CONFIGURAÇÃO
└── README.md               # Este arquivo
```

## 🔧 Funcionalidades Principais

### 1. **Lançamentos com Parcelas Inteligentes**
- Crie lançamentos parcelados automaticamente
- Sistema ajusta dias de vencimento (ex: 31/02 vira 28/02)
- Suporta cartão de crédito (competência mês/ano) e boletos (data completa)

### 2. **Categorias Personalizáveis**
- Receitas (Serviços, Vendas, Outras)
- Despesas (Pessoal, Impostos, Aluguel, etc)
- **Competência especial para cartão:** Marca `usarCompetenciaMesAno: true`

### 3. **Tipos de Lançamento**
- Empresa
- Pessoal (Sócios, Outros)
- Cada tipo com cor personalizada

### 4. **Status de Pagamento**
- Pago ✅
- Não Pago ❌
- Pendente ⏳
- Cancelado 🚫

### 5. **Backup e Restauração**
- Exporte seus dados em JSON
- Importe dados de backups anteriores
- Dados salvos no localStorage do navegador

## 💡 Exemplos de Uso

### Exemplo 1: Despesa de Internet Parcelada
```
Descrição: Internet Fibra
Categoria: Despesa - Internet
Valor: -1200
Parcelas: 12x
Vencimento: 31/10/2025
```

**Resultado:** 12 lançamentos automáticos de R$ 100,00:
- 31/10/2025, 30/11/2025, 31/12/2025, 31/01/2026...

### Exemplo 2: Compra no Cartão
```
Descrição: Notebook
Categoria: Despesa - Cartão
Valor: -4000
Parcelas: 10x
Competência: 11/2025 (mês da fatura)
```

**Resultado:** 10 lançamentos de R$ 400,00 com competências:
- 11/2025, 12/2025, 01/2026, 02/2026...

## 🛡️ Segurança dos Dados

- ✅ Todos os dados ficam **localmente no seu navegador**
- ✅ Nenhuma informação é enviada para servidores externos
- ✅ Faça backups regulares exportando o JSON
- ⚠️ Se limpar dados do navegador, você perde tudo (faça backup!)

## 📦 Backup e Migração

### Exportar Dados
1. Vá em **Configurações**
2. Clique em **Exportar Dados**
3. Salve o arquivo JSON em local seguro

### Importar Dados
1. Vá em **Configurações**
2. Clique em **Importar Dados**
3. Selecione o arquivo JSON salvo anteriormente

## 🎨 Personalização Visual

O sistema usa gradientes roxos por padrão. Para mudar as cores, edite os estilos CSS em cada arquivo HTML:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Substitua `#667eea` e `#764ba2` pelas cores de sua preferência.

## 🐛 Problemas Conhecidos

- O formato de data (dd/mm/yyyy ou mm/dd/yyyy) depende das configurações regionais do sistema operacional
- Internamente todas as datas são armazenadas no formato ISO (yyyy-mm-dd)

## 📝 Licença

Este projeto é de uso livre. Foi criado por IA para resolver necessidades reais de controle financeiro.

## 🤝 Contribuições

Como este é um projeto gerado por IA, você pode:
- Modificar livremente o código
- Adicionar novas funcionalidades
- Personalizar para suas necessidades
- Compartilhar com outros

## 📞 Suporte

Este é um sistema simples e autocontido. Todas as configurações estão no arquivo `script.js`.

Para dúvidas sobre como personalizar:
1. Abra o `script.js`
2. Procure a seção `CONFIG_SISTEMA`
3. Edite os valores conforme sua necessidade
4. Salve e recarregue a página

---

**Desenvolvido com ❤️ por Inteligência Artificial**

Sistema criado para facilitar o controle financeiro de pequenas empresas e pessoas físicas.
