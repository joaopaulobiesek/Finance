// ====================================
// WIESOO FINANCEIRO - SCRIPT PRINCIPAL
// Sistema com Parcelas e Status
// ====================================

// ====================================
// ⚙️ CONFIGURAÇÕES DO SISTEMA
// Edite aqui para adicionar categorias, tipos, status, etc
// ====================================

const CONFIG_SISTEMA = {
    categorias: [
        // RECEITAS
        {id: 1, nome: "Receita - Serviços", tipo: "receita", ativo: true, usarCompetenciaMesAno: false},
        {id: 2, nome: "Receita - Vendas", tipo: "receita", ativo: true, usarCompetenciaMesAno: false},
        {id: 3, nome: "Receita - Outras", tipo: "receita", ativo: true, usarCompetenciaMesAno: false},
        
        // DESPESAS
        {id: 10, nome: "Despesa - Pessoal", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 11, nome: "Despesa - Empréstimo", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 12, nome: "Despesa - Cartão", tipo: "despesa", ativo: true, usarCompetenciaMesAno: true},
        {id: 13, nome: "Despesa - Internet", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 14, nome: "Despesa - Energia", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 15, nome: "Despesa - Impostos", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 16, nome: "Despesa - Aluguel", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 17, nome: "Despesa - Fornecedores", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 18, nome: "Despesa - Combustível", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 99, nome: "Despesa - Outras", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false}
    ],
    
    tipos: [
        {id: 1, nome: "Empresa", cor: "#2196F3", ativo: true},
        {id: 2, nome: "Pessoal - Sócio 1", cor: "#FF9800", ativo: true},
        {id: 3, nome: "Pessoal - Sócio 2", cor: "#9C27B0", ativo: true},
        {id: 4, nome: "Pessoal - Outros", cor: "#F44336", ativo: true}
    ],
    
    status: [
        {id: 1, nome: "Pago", cor: "#4CAF50", icone: "✅", ativo: true},
        {id: 2, nome: "Não Pago", cor: "#f44336", icone: "❌", ativo: true},
        {id: 3, nome: "Pendente", cor: "#FF9800", icone: "⏳", ativo: true},
        {id: 4, nome: "Cancelado", cor: "#9E9E9E", icone: "🚫", ativo: true}
    ],
    
    opcoesParcelas: [
        {valor: 1, texto: "À vista"},
        {valor: 2, texto: "2x"},
        {valor: 3, texto: "3x"},
        {valor: 4, texto: "4x"},
        {valor: 5, texto: "5x"},
        {valor: 6, texto: "6x"},
        {valor: 7, texto: "7x"},
        {valor: 8, texto: "8x"},
        {valor: 9, texto: "9x"},
        {valor: 10, texto: "10x"},
        {valor: 11, texto: "11x"},
        {valor: 12, texto: "12x"},
        {valor: 18, texto: "18x"},
        {valor: 24, texto: "24x"},
        {valor: 36, texto: "36x"}
    ],
    
    configuracoes: {
        moeda: "BRL",
        simboloMoeda: "R$",
        formatoData: "DD/MM/YYYY",
        diasAlertaVencimento: 5
    }
};

// ====================================
// FIM DAS CONFIGURAÇÕES
// ====================================

// Cache do config
let configCache = null;

// Carregar configurações
async function carregarConfig() {
    if (configCache) {
        return configCache;
    }
    
    configCache = CONFIG_SISTEMA;
    return CONFIG_SISTEMA;
}

// Estrutura inicial dos dados
const dadosIniciais = {
    empresa: {
        nome: "Wiesoo",
        faturamentoMedio: 28000
    },
    lancamentos: [],
    proximoId: 1
};

// ====================================
// FUNÇÕES DE CONFIG (localStorage)
// ====================================

// Config padrão
const configPadrao = {
    categorias: [
        {id: 1, nome: "Receita - Serviços", tipo: "receita", ativo: true, usarCompetenciaMesAno: false},
        {id: 2, nome: "Receita - Vendas", tipo: "receita", ativo: true, usarCompetenciaMesAno: false},
        {id: 3, nome: "Receita - Outras", tipo: "receita", ativo: true, usarCompetenciaMesAno: false},
        {id: 10, nome: "Despesa - Pessoal", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 11, nome: "Despesa - Empréstimo", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 12, nome: "Despesa - Cartão", tipo: "despesa", ativo: true, usarCompetenciaMesAno: true},
        {id: 13, nome: "Despesa - Internet", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 14, nome: "Despesa - Energia", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 15, nome: "Despesa - Impostos", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 16, nome: "Despesa - Aluguel", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 17, nome: "Despesa - Fornecedores", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false},
        {id: 99, nome: "Despesa - Outras", tipo: "despesa", ativo: true, usarCompetenciaMesAno: false}
    ],
    tipos: [
        {id: 1, nome: "Empresa", cor: "#2196F3", ativo: true},
        {id: 2, nome: "Pessoal - Sócio 1", cor: "#FF9800", ativo: true},
        {id: 3, nome: "Pessoal - Sócio 2", cor: "#9C27B0", ativo: true},
        {id: 4, nome: "Pessoal - Outros", cor: "#F44336", ativo: true}
    ],
    status: [
        {id: 1, nome: "Pago", cor: "#4CAF50", icone: "✅", ativo: true},
        {id: 2, nome: "Não Pago", cor: "#f44336", icone: "❌", ativo: true},
        {id: 3, nome: "Pendente", cor: "#FF9800", icone: "⏳", ativo: true},
        {id: 4, nome: "Cancelado", cor: "#9E9E9E", icone: "🚫", ativo: true}
    ],
    opcoesParcelas: [
        {valor: 1, texto: "À vista"},
        {valor: 2, texto: "2x"},
        {valor: 3, texto: "3x"},
        {valor: 4, texto: "4x"},
        {valor: 5, texto: "5x"},
        {valor: 6, texto: "6x"},
        {valor: 7, texto: "7x"},
        {valor: 8, texto: "8x"},
        {valor: 9, texto: "9x"},
        {valor: 10, texto: "10x"},
        {valor: 11, texto: "11x"},
        {valor: 12, texto: "12x"},
        {valor: 18, texto: "18x"},
        {valor: 24, texto: "24x"},
        {valor: 36, texto: "36x"}
    ],
    configuracoes: {
        moeda: "BRL",
        simboloMoeda: "R$",
        formatoData: "DD/MM/YYYY",
        diasAlertaVencimento: 5
    }
};

// Salvar config no localStorage
function salvarConfig(config) {
    localStorage.setItem('wiesooConfig', JSON.stringify(config, null, 2));
    configCache = config;
}

// Exportar config para JSON
async function exportarConfig() {
    const config = await carregarConfig();
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    if ('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'config.json',
                types: [{
                    description: 'Arquivo JSON',
                    accept: {'application/json': ['.json']},
                }],
            });
            
            const writable = await handle.createWritable();
            await writable.write(dataBlob);
            await writable.close();
            
            return true;
        } catch (err) {
            if (err.name === 'AbortError') {
                return false;
            }
        }
    }
    
    // Fallback
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
    
    return true;
}

// Importar config de arquivo JSON
function importarConfig(arquivo) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            salvarConfig(config);
            alert('✅ Configurações importadas com sucesso!');
            window.location.reload();
        } catch (error) {
            alert('❌ Erro ao importar arquivo! Verifique se é um JSON válido.');
        }
    };
    
    reader.readAsText(arquivo);
}

// Obter categoria por ID
async function obterCategoriaPorId(id) {
    const config = await carregarConfig();
    return config.categorias.find(c => c.id === id);
}

// Obter tipo por ID
async function obterTipoPorId(id) {
    const config = await carregarConfig();
    return config.tipos.find(t => t.id === id);
}

// Obter status por ID
async function obterStatusPorId(id) {
    const config = await carregarConfig();
    return config.status.find(s => s.id === id);
}

// ====================================
// FUNÇÕES DE GERENCIAMENTO DE DADOS
// ====================================

// Carregar dados do localStorage
function carregarDados() {
    const dadosSalvos = localStorage.getItem('wiesooData');
    if (dadosSalvos) {
        return JSON.parse(dadosSalvos);
    }
    salvarDados(dadosIniciais);
    return dadosIniciais;
}

// Salvar dados no localStorage (SEM download automático)
function salvarDados(dados) {
    localStorage.setItem('wiesooData', JSON.stringify(dados, null, 2));
}

// Exportar dados para arquivo JSON (uso manual)
async function exportarJSON() {
    const dados = carregarDados();
    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    // Verifica se o navegador suporta a API de salvar arquivos
    if ('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'dados-wiesoo-backup.json',
                types: [{
                    description: 'Arquivo JSON',
                    accept: {'application/json': ['.json']},
                }],
            });
            
            const writable = await handle.createWritable();
            await writable.write(dataBlob);
            await writable.close();
            
            return true;
        } catch (err) {
            if (err.name === 'AbortError') {
                return false;
            }
        }
    }
    
    // Fallback
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'dados-wiesoo-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
    
    return true;
}

// ====================================
// FUNÇÕES DE LANÇAMENTOS
// ====================================

// Obter último dia do mês
function obterUltimoDiaDoMes(ano, mes) {
    // mes vem de 0-11 (Janeiro = 0, Dezembro = 11)
    // new Date(ano, mes + 1, 0) retorna o último dia do mês
    return new Date(ano, mes + 1, 0).getDate();
}

// Ajustar data para o último dia do mês se necessário
function ajustarDiaDoMes(ano, mes, diaDesejado) {
    const ultimoDia = obterUltimoDiaDoMes(ano, mes);
    
    // Se o dia desejado existe no mês, retorna ele sem alteração
    if (diaDesejado <= ultimoDia) {
        return diaDesejado;
    }
    
    // Se o dia não existe no mês, ajusta para o último dia disponível
    // Exemplos:
    // - Dia 31 em fevereiro → 28 ou 29
    // - Dia 31 em abril → 30
    return ultimoDia;
}

// Adicionar novo lançamento (com ou sem parcelas)
function adicionarLancamento(lancamento) {
    const dados = carregarDados();
    
    // Encontrar o maior ID atual
    let maiorId = 0;
    if (dados.lancamentos && dados.lancamentos.length > 0) {
        maiorId = Math.max(...dados.lancamentos.map(l => l.id));
    }
    
    // Se tem parcelas, criar múltiplos lançamentos
    if (lancamento.numeroParcelas && lancamento.numeroParcelas > 1) {
        const valorParcela = lancamento.valor / lancamento.numeroParcelas;
        const dataOriginal = lancamento.data; // DATA NUNCA MUDA!
        const grupoId = Date.now();
        
        // Verificar se usa competência mês/ano ou data completa
        const usaMesAno = !!lancamento.competenciaFatura && lancamento.competenciaFatura.length === 7;
        const usaDataCompleta = !!lancamento.dataVencimento;
        
        let competenciaBase = null;
        let vencimentoBase = null;
        
        if (usaMesAno) {
            // CARTÃO: Usa mês/ano
            const [ano, mes] = lancamento.competenciaFatura.split('-');
            competenciaBase = new Date(parseInt(ano), parseInt(mes) - 1, 1);
        } else if (usaDataCompleta) {
            // BOLETO/OUTROS: Usa data completa
            // Parse manual para evitar problemas de timezone
            const [ano, mes, dia] = lancamento.dataVencimento.split('-').map(Number);
            vencimentoBase = new Date(ano, mes - 1, dia, 12, 0, 0);
        }

        // Dia original do vencimento para ajuste em meses sem esse dia
        const diaOriginalVencimento = usaDataCompleta ? vencimentoBase.getDate() : new Date(dataOriginal).getDate();

        for (let i = 1; i <= lancamento.numeroParcelas; i++) {
            maiorId++;

            let competenciaFatura = null;
            let dataVencimento = null;

            if (usaMesAno) {
                // CARTÃO: Só incrementa mês/ano da competência
                const novaCompetencia = new Date(competenciaBase);
                novaCompetencia.setMonth(novaCompetencia.getMonth() + (i - 1));
                const anoComp = novaCompetencia.getFullYear();
                const mesComp = String(novaCompetencia.getMonth() + 1).padStart(2, '0');
                competenciaFatura = `${anoComp}-${mesComp}`;
            } else if (usaDataCompleta) {
                // BOLETO/OUTROS: Incrementa mês do vencimento mantendo o dia desejado
                // Calcular ano e mês baseado no incremento
                const anoBase = vencimentoBase.getFullYear();
                const mesBase = vencimentoBase.getMonth(); // 0-11

                // Adicionar meses diretamente
                const mesesTotais = mesBase + (i - 1);
                const anoVenc = anoBase + Math.floor(mesesTotais / 12);
                const mesVenc = mesesTotais % 12;

                // Ajustar o dia para o último dia disponível no mês
                const diaAjustado = ajustarDiaDoMes(anoVenc, mesVenc, diaOriginalVencimento);

                // Criar data final com o dia ajustado
                const dataFinal = new Date(anoVenc, mesVenc, diaAjustado, 12, 0, 0);
                dataVencimento = dataFinal.toISOString().split('T')[0];
            }
            
            const novoLancamento = {
                id: maiorId,
                data: dataOriginal, // DATA SEMPRE A MESMA!!!
                descricao: `${lancamento.descricao} (${i}/${lancamento.numeroParcelas})`,
                categoriaId: lancamento.categoriaId,
                valor: valorParcela,
                tipoId: lancamento.tipoId,
                statusId: lancamento.statusId || 2,
                parcelas: {
                    numero: i,
                    total: lancamento.numeroParcelas,
                    valorParcela: valorParcela,
                    parcelaAtual: `${i}/${lancamento.numeroParcelas}`
                },
                grupoParcelasId: grupoId
            };

            if (competenciaFatura) {
                novoLancamento.competenciaFatura = competenciaFatura;
            }
            
            if (dataVencimento) {
                novoLancamento.dataVencimento = dataVencimento;
            }
            
            dados.lancamentos.push(novoLancamento);
        }
    } else {
        // Lançamento único
        maiorId++;
        lancamento.id = maiorId;
        lancamento.statusId = lancamento.statusId || 1;
        dados.lancamentos.push(lancamento);
    }
    
    dados.proximoId = maiorId + 1;
    salvarDados(dados);
    return true;
}

// Editar lançamento existente
function editarLancamento(id, dadosAtualizados) {
    const dados = carregarDados();
    const index = dados.lancamentos.findIndex(l => l.id === id);
    
    if (index !== -1) {
        dados.lancamentos[index] = { ...dados.lancamentos[index], ...dadosAtualizados };
        salvarDados(dados);
        return true;
    }
    return false;
}

// Marcar parcela como paga/não paga
function alterarStatusLancamento(id, novoStatusId) {
    return editarLancamento(id, { statusId: novoStatusId });
}

// Deletar lançamento
function deletarLancamento(id) {
    const dados = carregarDados();
    dados.lancamentos = dados.lancamentos.filter(l => l.id !== id);
    salvarDados(dados);
}

// Deletar grupo de parcelas
function deletarGrupoParcelas(grupoId) {
    const dados = carregarDados();
    dados.lancamentos = dados.lancamentos.filter(l => l.grupoParcelasId !== grupoId);
    salvarDados(dados);
}

// Obter todos os lançamentos
function obterLancamentos() {
    const dados = carregarDados();
    return dados.lancamentos;
}

// Obter lançamento por ID
function obterLancamentoPorId(id) {
    const dados = carregarDados();
    return dados.lancamentos.find(l => l.id === id);
}

// Obter lançamentos por tipo
function obterLancamentosPorTipo(tipoId) {
    const lancamentos = obterLancamentos();
    return lancamentos.filter(l => l.tipoId === tipoId);
}

// Obter lançamentos por status
function obterLancamentosPorStatus(statusId) {
    const lancamentos = obterLancamentos();
    return lancamentos.filter(l => l.statusId === statusId);
}

// ====================================
// FUNÇÕES DE CÁLCULOS
// ====================================

// Calcular total de receitas (apenas tipo Empresa e Pago)
function calcularTotalReceitas(statusId = null) {
    const lancamentos = obterLancamentos();
    return lancamentos
        .filter(l => l.tipoId === 1 && l.valor > 0 && (statusId === null || l.statusId === statusId))
        .reduce((total, l) => total + l.valor, 0);
}

// Calcular total de despesas (apenas tipo Empresa e Pago)
function calcularTotalDespesas(statusId = null) {
    const lancamentos = obterLancamentos();
    return lancamentos
        .filter(l => l.tipoId === 1 && l.valor < 0 && (statusId === null || l.statusId === statusId))
        .reduce((total, l) => total + Math.abs(l.valor), 0);
}

// Calcular saldo (receitas - despesas) apenas Pagos
function calcularSaldo() {
    return calcularTotalReceitas(1) - calcularTotalDespesas(1);
}

// Calcular gastos pessoais (qualquer tipo que não seja Empresa)
function calcularGastosPessoais(tipoId = null) {
    const lancamentos = obterLancamentos();
    return lancamentos
        .filter(l => l.tipoId !== 1 && (tipoId === null || l.tipoId === tipoId))
        .reduce((total, l) => total + Math.abs(l.valor), 0);
}

// Obter gastos pessoais
function obterGastosPessoais(tipoId = null) {
    const lancamentos = obterLancamentos();
    return lancamentos.filter(l => l.tipoId !== 1 && (tipoId === null || l.tipoId === tipoId));
}

// Calcular total a pagar (não pagos)
function calcularTotalAPagar() {
    const lancamentos = obterLancamentos();
    return lancamentos
        .filter(l => l.statusId === 2 && l.valor < 0)
        .reduce((total, l) => total + Math.abs(l.valor), 0);
}

// Calcular total a receber (não pagos)
function calcularTotalAReceber() {
    const lancamentos = obterLancamentos();
    return lancamentos
        .filter(l => l.statusId === 2 && l.valor > 0)
        .reduce((total, l) => total + l.valor, 0);
}

// ====================================
// FUNÇÕES DE RELATÓRIOS
// ====================================

// Agrupar lançamentos por mês
function agruparPorMes() {
    const lancamentos = obterLancamentos();
    const porMes = {};
    
    lancamentos.forEach(l => {
        // Usa competenciaFatura ou dataVencimento se existir, senão usa a data do lançamento
        const mes = obterCompetenciaLancamento(l);
        
        if (!porMes[mes]) {
            porMes[mes] = {
                receitas: 0,
                despesas: 0,
                gastosPessoais: 0,
                lancamentos: []
            };
        }
        
        if (l.tipoId === 1 && l.statusId === 1) {
            if (l.valor > 0) {
                porMes[mes].receitas += l.valor;
            } else {
                porMes[mes].despesas += Math.abs(l.valor);
            }
        } else if (l.tipoId !== 1) {
            porMes[mes].gastosPessoais += Math.abs(l.valor);
        }
        
        porMes[mes].lancamentos.push(l);
    });
    
    return porMes;
}

// Agrupar lançamentos por categoria
async function agruparPorCategoria() {
    const lancamentos = obterLancamentos();
    const porCategoria = {};
    
    for (const l of lancamentos) {
        const categoria = await obterCategoriaPorId(l.categoriaId);
        const nomeCategoria = categoria ? categoria.nome : 'Sem Categoria';
        
        if (!porCategoria[nomeCategoria]) {
            porCategoria[nomeCategoria] = {
                total: 0,
                quantidade: 0,
                lancamentos: []
            };
        }
        
        porCategoria[nomeCategoria].total += Math.abs(l.valor);
        porCategoria[nomeCategoria].quantidade++;
        porCategoria[nomeCategoria].lancamentos.push(l);
    }
    
    return porCategoria;
}

// ====================================
// FUNÇÕES DE FORMATAÇÃO
// ====================================

// Formatar valor em Real
function formatarReal(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Formatar data
function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Formatar mês
function formatarMes(mesAno) {
    const [ano, mes] = mesAno.split('-');
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                   'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${meses[parseInt(mes) - 1]}/${ano}`;
}

// Obter mês seguinte no formato YYYY-MM
function obterMesSeguinte(data = null) {
    const dataBase = data ? new Date(data) : new Date();
    dataBase.setMonth(dataBase.getMonth() + 1);
    const ano = dataBase.getFullYear();
    const mes = String(dataBase.getMonth() + 1).padStart(2, '0');
    return `${ano}-${mes}`;
}

// Obter competência do lançamento (usa competenciaFatura ou dataVencimento se existir, senão usa a data)
function obterCompetenciaLancamento(lancamento) {
    if (lancamento.competenciaFatura) {
        return lancamento.competenciaFatura;
    }
    if (lancamento.dataVencimento) {
        return lancamento.dataVencimento.substring(0, 7);
    }
    return lancamento.data.substring(0, 7);
}

// ====================================
// FUNÇÕES DE BACKUP/RESTAURAÇÃO
// ====================================

// Importar dados de um arquivo JSON
function importarJSON(arquivo) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const dados = JSON.parse(e.target.result);
            salvarDados(dados);
            alert('✅ Dados importados com sucesso!');
            window.location.reload();
        } catch (error) {
            alert('❌ Erro ao importar arquivo! Verifique se é um JSON válido.');
        }
    };
    
    reader.readAsText(arquivo);
}

// Limpar todos os dados
function limparDados() {
    if (confirm('⚠️ TEM CERTEZA? Isso vai apagar TODOS os dados!')) {
        if (confirm('⚠️ ÚLTIMA CHANCE! Apagar tudo mesmo?')) {
            localStorage.removeItem('wiesooData');
            salvarDados(dadosIniciais);
            alert('✅ Dados limpos! Sistema reiniciado.');
            window.location.href = 'index.html';
        }
    }
}

// ====================================
// INICIALIZAÇÃO
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    carregarConfig();
});