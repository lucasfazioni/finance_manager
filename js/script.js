/**
 * ============================================================================
 * FINCORE PRIVATE — GESTÃO DE RECEITAS, DESPESAS & FORECAST (SICREDI + GEMINI)
 * Arquitetura SPA Vanilla JS com Fetch API (REST / Google Apps Script)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. ARTEFATOS DE DADOS (MOCK DAS 3 TABELAS COM ESQUEMA EXATO)
// ----------------------------------------------------------------------------

// Tabela 1: matriz_despesa_receita/MATRIZ
const INITIAL_MATRIZ = [
  {
    conta: 101,
    type: "RECEITA",
    nature: "Receita Operacional",
    desc_conta: "Salário / Remuneração Principal",
    exemple_conta_operation: "Crédito Folha / TED Salário",
    class: "Fixa",
    desc_extrato: "SALARIO,REMUNERACAO,SICREDI FOLHA,CREDITO SALARIO"
  },
  {
    conta: 102,
    type: "RECEITA",
    nature: "Receita Extraordinária",
    desc_conta: "Consultoria / Projetos Tech & IA",
    exemple_conta_operation: "Recebimento PIX Projetos / Palestras",
    class: "Variável",
    desc_extrato: "PIX RECEBIDO PROJETO,CONSULTORIA,BOLSA PESQUISA,FREELANCE"
  },
  {
    conta: 103,
    type: "RECEITA",
    nature: "Rendimentos Financeiros",
    desc_conta: "Dividendos & Rendimento SicrediInvest",
    exemple_conta_operation: "Resgate ou Proventos",
    class: "Variável",
    desc_extrato: "RENDIMENTO,DIVIDENDOS,SICREDI INVEST,JUROS CAPITAL"
  },
  {
    conta: 201,
    type: "DESPESA",
    nature: "Habitação & Utilidades",
    desc_conta: "Financiamento / Condomínio / IPTU",
    exemple_conta_operation: "Boleto Habitação e Taxas",
    class: "Fixa",
    desc_extrato: "HABITACAO,CONDOMINIO,IPTU,PRESTACAO IMOVEL"
  },
  {
    conta: 202,
    type: "DESPESA",
    nature: "Habitação & Utilidades",
    desc_conta: "Energia, Água e Fibra Óptica",
    exemple_conta_operation: "Débito Automático Concessionárias",
    class: "Fixa",
    desc_extrato: "RGE SUL,CORSAN,CLARO FIBRA,VIVO FIBRA,ENERGIA"
  },
  {
    conta: 203,
    type: "DESPESA",
    nature: "Alimentação & Supermercado",
    desc_conta: "Supermercado & Feira Mensal",
    exemple_conta_operation: "Compra Débito/Crédito Supermercados",
    class: "Variável",
    desc_extrato: "ZAFFARI,STOK CENTER,SUPERMERCADO,PADARIA,ACOUGUE"
  },
  {
    conta: 204,
    type: "DESPESA",
    nature: "Mobilidade & Transporte",
    desc_conta: "Combustível, Pedágio e Manutenção",
    exemple_conta_operation: "Postos de Combustível e Deslocamento",
    class: "Variável",
    desc_extrato: "POSTO IPIRANGA,SHELL,PETROBRAS,UBER,PEDAGIO,VELOE"
  },
  {
    conta: 205,
    type: "DESPESA",
    nature: "Educação & Família",
    desc_conta: "Escola, Cursos e Pós-Graduação",
    exemple_conta_operation: "Mensalidade Escolar e Livros",
    class: "Fixa",
    desc_extrato: "COLEGIO,ESCOLA,MENSALIDADE,LIVRARIA,CURSO"
  },
  {
    conta: 206,
    type: "DESPESA",
    nature: "Saúde & Performance",
    desc_conta: "Academia, Farmácia e Plano de Saúde",
    exemple_conta_operation: "Mensalidade Academia e Medicamentos",
    class: "Fixa",
    desc_extrato: "UNIMED,PANVEL,SAO JOAO,ACADEMIA,SMARTFIT,SUPLEMENTOS"
  },
  {
    conta: 207,
    type: "DESPESA",
    nature: "Estilo de Vida & Lazer",
    desc_conta: "Restaurantes, Eventos e Streaming",
    exemple_conta_operation: "Gastronomia, Viagens e Assinaturas",
    class: "Variável",
    desc_extrato: "IFOOD,RESTAURANTE,NETFLIX,SPOTIFY,AMAZON PRIME,HAMBURGUERIA"
  },
  {
    conta: 208,
    type: "DESPESA",
    nature: "Serviços Financeiros",
    desc_conta: "Fatura Cartão / Tarifas / Seguros",
    exemple_conta_operation: "Liquidação Fatura Mastercard Black",
    class: "Variável",
    desc_extrato: "DEB.CTA.FATURA,SEGURO AUTO,TARIFA PACOTE,IOF"
  }
];

// Tabela 2: matriz_despesa_receita/budget
const INITIAL_BUDGET = [
  { dt_venc: "2026-11-05", cod_conta: 101, desc_conta: "Salário / Remuneração Principal", valor_budget: 16500.00, tipo: "RECEITA", obs_budget: "Remuneração líquida mensal" },
  { dt_venc: "2026-11-15", cod_conta: 102, desc_conta: "Consultoria / Projetos Tech & IA", valor_budget: 3500.00, tipo: "RECEITA", obs_budget: "Projeto de IA e mentoria técnica" },
  { dt_venc: "2026-11-28", cod_conta: 103, desc_conta: "Dividendos & Rendimento SicrediInvest", valor_budget: 850.00, tipo: "RECEITA", obs_budget: "Projeção carteira CDI + FIIs" },
  { dt_venc: "2026-11-10", cod_conta: 201, desc_conta: "Financiamento / Condomínio / IPTU", valor_budget: 3200.00, tipo: "DESPESA", obs_budget: "Parcela residencial + taxas" },
  { dt_venc: "2026-11-12", cod_conta: 202, desc_conta: "Energia, Água e Fibra Óptica", valor_budget: 680.00, tipo: "DESPESA", obs_budget: "RGE + Corsan + Fibra" },
  { dt_venc: "2026-11-20", cod_conta: 203, desc_conta: "Supermercado & Feira Mensal", valor_budget: 2400.00, tipo: "DESPESA", obs_budget: "Meta compras familiares" },
  { dt_venc: "2026-11-22", cod_conta: 204, desc_conta: "Combustível, Pedágio e Manutenção", valor_budget: 950.00, tipo: "DESPESA", obs_budget: "Deslocamentos RS / Porto Alegre" },
  { dt_venc: "2026-11-08", cod_conta: 205, desc_conta: "Escola, Cursos e Pós-Graduação", valor_budget: 1850.00, tipo: "DESPESA", obs_budget: "Educação filhas e materiais" },
  { dt_venc: "2026-11-10", cod_conta: 206, desc_conta: "Academia, Farmácia e Plano de Saúde", valor_budget: 1150.00, tipo: "DESPESA", obs_budget: "Unimed + Treino + Farmácia" },
  { dt_venc: "2026-11-25", cod_conta: 207, desc_conta: "Restaurantes, Eventos e Streaming", valor_budget: 1100.00, tipo: "DESPESA", obs_budget: "Lazer fim de semana e assinaturas" },
  { dt_venc: "2026-11-18", cod_conta: 208, desc_conta: "Fatura Cartão / Tarifas / Seguros", valor_budget: 1900.00, tipo: "DESPESA", obs_budget: "Seguro automotivo e compras parceladas" },
  // Provisão Outubro para comparativo trimestral/anual
  { dt_venc: "2026-10-05", cod_conta: 101, desc_conta: "Salário / Remuneração Principal", valor_budget: 16500.00, tipo: "RECEITA", obs_budget: "Competência Outubro" },
  { dt_venc: "2026-10-15", cod_conta: 201, desc_conta: "Financiamento / Condomínio / IPTU", valor_budget: 3200.00, tipo: "DESPESA", obs_budget: "Competência Outubro" },
  { dt_venc: "2026-10-20", cod_conta: 203, desc_conta: "Supermercado & Feira Mensal", valor_budget: 2400.00, tipo: "DESPESA", obs_budget: "Competência Outubro" }
];

// Tabela 3: db_extratos_sicredi
const INITIAL_EXTRATOS_SICREDI = [
  { id_transacao: "SIC-9001", cod_conta: null, dta_transacao: "2026-11-03", ano_mes: "2026-11", cod_documento: "DOC-011", desc_documento: "CREDITO SALARIO SICREDI FOLHA", tpo_transacao: "CREDITO", vlr_transacao: 16500.00, saldo_conta: 24120.50 },
  { id_transacao: "SIC-9002", cod_conta: null, dta_transacao: "2026-11-05", ano_mes: "2026-11", cod_documento: "PIX-882", desc_documento: "PAGTO BOLETO COLEGIO SINODAL", tpo_transacao: "DEBITO", vlr_transacao: -1820.00, saldo_conta: 22300.50 },
  { id_transacao: "SIC-9003", cod_conta: null, dta_transacao: "2026-11-06", ano_mes: "2026-11", cod_documento: "DEB-104", desc_documento: "DEBITO CONVENIO RGE SUL ENERGIA", tpo_transacao: "DEBITO", vlr_transacao: -485.40, saldo_conta: 21815.10 },
  { id_transacao: "SIC-9004", cod_conta: null, dta_transacao: "2026-11-07", ano_mes: "2026-11", cod_documento: "CRT-331", desc_documento: "COMPRA MASTERCARD STOK CENTER", tpo_transacao: "DEBITO", vlr_transacao: -1490.80, saldo_conta: 20324.30 },
  { id_transacao: "SIC-9005", cod_conta: null, dta_transacao: "2026-11-08", ano_mes: "2026-11", cod_documento: "PIX-910", desc_documento: "PIX RECEBIDO PROJETO CONSULTORIA IA", tpo_transacao: "CREDITO", vlr_transacao: 4200.00, saldo_conta: 24524.30 },
  { id_transacao: "SIC-9006", cod_conta: null, dta_transacao: "2026-11-08", ano_mes: "2026-11", cod_documento: "CRT-412", desc_documento: "COMPRA POSTO IPIRANGA BR116", tpo_transacao: "DEBITO", vlr_transacao: -380.00, saldo_conta: 24144.30 },
  { id_transacao: "SIC-9007", cod_conta: null, dta_transacao: "2026-11-09", ano_mes: "2026-11", cod_documento: "BOL-702", desc_documento: "LIQUIDACAO PRESTACAO IMOVEL HABITACAO", tpo_transacao: "DEBITO", vlr_transacao: -3190.00, saldo_conta: 20954.30 },
  { id_transacao: "SIC-9008", cod_conta: null, dta_transacao: "2026-11-10", ano_mes: "2026-11", cod_documento: "CRT-519", desc_documento: "COMPRA BOURBON ZAFFARI SUPERMERCADO", tpo_transacao: "DEBITO", vlr_transacao: -1180.20, saldo_conta: 19774.10 },
  { id_transacao: "SIC-9009", cod_conta: null, dta_transacao: "2026-11-10", ano_mes: "2026-11", cod_documento: "DEB-220", desc_documento: "MENSALIDADE UNIMED PLANO SAUDE", tpo_transacao: "DEBITO", vlr_transacao: -980.00, saldo_conta: 18794.10 },
  { id_transacao: "SIC-9010", cod_conta: null, dta_transacao: "2026-11-11", ano_mes: "2026-11", cod_documento: "CRT-605", desc_documento: "IFOOD RESTAURANTE E HAMBURGUERIA", tpo_transacao: "DEBITO", vlr_transacao: -1340.00, saldo_conta: 17454.10 },
  { id_transacao: "SIC-9011", cod_conta: null, dta_transacao: "2026-11-11", ano_mes: "2026-11", cod_documento: "INV-099", desc_documento: "CREDITO RENDIMENTO SICREDI INVEST", tpo_transacao: "CREDITO", vlr_transacao: 910.45, saldo_conta: 18364.55 },
  { id_transacao: "SIC-9012", cod_conta: null, dta_transacao: "2026-11-11", ano_mes: "2026-11", cod_documento: "FAT-800", desc_documento: "DEB.CTA.FATURA MASTERCARD BLACK", tpo_transacao: "DEBITO", vlr_transacao: -2150.00, saldo_conta: 16214.55 },
  // Movimentações de Outubro para visão Trimestral/Anual
  { id_transacao: "SIC-8901", cod_conta: null, dta_transacao: "2026-10-05", ano_mes: "2026-10", cod_documento: "DOC-009", desc_documento: "CREDITO SALARIO SICREDI FOLHA", tpo_transacao: "CREDITO", vlr_transacao: 16500.00, saldo_conta: 19200.00 },
  { id_transacao: "SIC-8902", cod_conta: null, dta_transacao: "2026-10-12", ano_mes: "2026-10", cod_documento: "BOL-610", desc_documento: "LIQUIDACAO PRESTACAO IMOVEL HABITACAO", tpo_transacao: "DEBITO", vlr_transacao: -3190.00, saldo_conta: 16010.00 },
  { id_transacao: "SIC-8903", cod_conta: null, dta_transacao: "2026-10-19", ano_mes: "2026-10", cod_documento: "CRT-299", desc_documento: "COMPRA ZAFFARI SUPERMERCADO", tpo_transacao: "DEBITO", vlr_transacao: -2290.00, saldo_conta: 13720.00 }
];

// ----------------------------------------------------------------------------
// 2. ESTADO GLOBAL DA APLICAÇÃO E CONFIGURAÇÃO DE API
// ----------------------------------------------------------------------------
const AppState = {
  apiEndpoint: localStorage.getItem("fincore_api_endpoint") || "",
  geminiApiKey: localStorage.getItem("fincore_gemini_key") || "",
  conceptMode: "cashflow", // "cashflow" | "managerial"
  period: "month",         // "week" | "month" | "quarter" | "year"
  forecastGroup: "month",  // "month" | "nature" | "account"
  filters: {
    type: "ALL",
    nature: "ALL",
    metric: "BOTH"
  },
  matriz: [],
  budget: [],
  extratos: [],
  charts: {
    main: null,
    doughnut: null
  }
};

// Utilitários de Formatação
const formatBRL = (val) => {
  const num = Number(val) || 0;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const normalizeStr = (str) => {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
};

const showToast = (msg) => {
  const toast = document.getElementById("appToast");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2800);
};

// ----------------------------------------------------------------------------
// 3. CAMADA DE PERSISTÊNCIA E CONEXÃO COM BANCO DE DADOS (FETCH API)
// ----------------------------------------------------------------------------
async function loadDatabaseData() {
  // Se houver endpoint REST configurado (ex: Google Apps Script ou API MySQL), busca via Fetch
  if (AppState.apiEndpoint) {
    try {
      showToast("Sincronizando com API remota...");
      const response = await fetch(`${AppState.apiEndpoint}?action=getAllTables`, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        AppState.matriz = data.MATRIZ || INITIAL_MATRIZ;
        AppState.budget = data.budget || INITIAL_BUDGET;
        AppState.extratos = data.db_extratos_sicredi || INITIAL_EXTRATOS_SICREDI;
        saveToLocalCache();
        showToast("Dados sincronizados via REST API!");
        return;
      }
    } catch (err) {
      console.warn("Falha no endpoint remoto, usando cache local/mock:", err);
      showToast("Modo Offline: utilizando base local");
    }
  }

  // Fallback para LocalStorage / Mock Inicial
  const cachedMatriz = localStorage.getItem("fincore_table_matriz");
  const cachedBudget = localStorage.getItem("fincore_table_budget");
  const cachedExtratos = localStorage.getItem("fincore_table_extratos");

  AppState.matriz = cachedMatriz ? JSON.parse(cachedMatriz) : structuredClone(INITIAL_MATRIZ);
  AppState.budget = cachedBudget ? JSON.parse(cachedBudget) : structuredClone(INITIAL_BUDGET);
  AppState.extratos = cachedExtratos ? JSON.parse(cachedExtratos) : structuredClone(INITIAL_EXTRATOS_SICREDI);
}

function saveToLocalCache() {
  localStorage.setItem("fincore_table_matriz", JSON.stringify(AppState.matriz));
  localStorage.setItem("fincore_table_budget", JSON.stringify(AppState.budget));
  localStorage.setItem("fincore_table_extratos", JSON.stringify(AppState.extratos));
}

async function syncTableChangeToBackend(tableName, operation, payload) {
  saveToLocalCache();
  if (!AppState.apiEndpoint) return;

  try {
    await fetch(AppState.apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: tableName,
        operation: operation,
        payload: payload,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.warn(`Sincronização assíncrona pendente para ${tableName}:`, err);
  }
}

// ----------------------------------------------------------------------------
// 4. MOTOR DE CLASSIFICAÇÃO AUTOMÁTICA (EXTRATO SICREDI <-> TABELA MATRIZ)
// ----------------------------------------------------------------------------
function classifyTransactions(forceOverride = false) {
  let matchedCount = 0;

  AppState.extratos = AppState.extratos.map((tx) => {
    // Se já possui cod_conta atribuído manualmente e não for reprocessamento forçado, preserva
    if (tx.cod_conta && !forceOverride) {
      const existingRule = AppState.matriz.find((m) => Number(m.conta) === Number(tx.cod_conta));
      if (existingRule) {
        matchedCount++;
        return enrichTransaction(tx, existingRule, "MANUAL/SALVO");
      }
    }

    const normDoc = normalizeStr(tx.desc_documento);
    let matchedRule = null;
    let matchedTag = null;

    for (const rule of AppState.matriz) {
      const tags = String(rule.desc_extrato || "")
        .split(/[,;|]/)
        .map((t) => normalizeStr(t))
        .filter(Boolean);

      for (const tag of tags) {
        if (normDoc.includes(tag)) {
          matchedRule = rule;
          matchedTag = tag;
          break;
        }
      }
      if (matchedRule) break;
    }

    if (matchedRule) {
      matchedCount++;
      return enrichTransaction(tx, matchedRule, matchedTag);
    }

    // Caso não encontre tag na MATRIZ, infere pelo sinal/tipo de transação
    const fallbackType = tx.vlr_transacao >= 0 || tx.tpo_transacao === "CREDITO" ? "RECEITA" : "DESPESA";
    return {
      ...tx,
      cod_conta: null,
      type: fallbackType,
      nature: "Não Classificado",
      desc_conta: "Aguardando Vínculo MATRIZ",
      class: "Variável",
      matched_tag: null
    };
  });

  saveToLocalCache();
  return matchedCount;
}

function enrichTransaction(tx, rule, matchedTag) {
  return {
    ...tx,
    cod_conta: rule.conta,
    type: rule.type,
    nature: rule.nature,
    desc_conta: rule.desc_conta,
    class: rule.class, // "Fixa" ou "Variável"
    matched_tag: matchedTag
  };
}

// ----------------------------------------------------------------------------
// 5. FILTRAGEM DE PERÍODO E AGREGAÇÃO (DASHBOARD & GERENCIAL)
// ----------------------------------------------------------------------------
function isDateInSelectedPeriod(dateStr, period) {
  // Data âncora de referência: Novembro de 2026
  const refDate = new Date("2026-11-11T12:00:00");
  const target = new Date(`${dateStr}T12:00:00`);
  if (isNaN(target)) return false;

  if (period === "week") {
    const diffDays = (refDate - target) / (1000 * 60 * 60 * 24);
    return diffDays >= -2 && diffDays <= 7;
  }
  if (period === "month") {
    return target.getFullYear() === refDate.getFullYear() && target.getMonth() === refDate.getMonth();
  }
  if (period === "quarter") {
    const refQ = Math.floor(refDate.getMonth() / 3);
    const targetQ = Math.floor(target.getMonth() / 3);
    return target.getFullYear() === refDate.getFullYear() && targetQ === refQ;
  }
  if (period === "year") {
    return target.getFullYear() === refDate.getFullYear();
  }
  return true;
}

function getFilteredData() {
  const { type, nature } = AppState.filters;

  const filteredExtratos = AppState.extratos.filter((tx) => {
    if (!isDateInSelectedPeriod(tx.dta_transacao, AppState.period)) return false;
    if (type !== "ALL" && tx.type !== type) return false;
    if (nature !== "ALL" && tx.nature !== nature) return false;
    return true;
  });

  const filteredBudget = AppState.budget.filter((b) => {
    const rule = AppState.matriz.find((m) => Number(m.conta) === Number(b.cod_conta));
    const bNature = rule ? rule.nature : "Outros";
    if (!isDateInSelectedPeriod(b.dt_venc, AppState.period)) return false;
    if (type !== "ALL" && b.tipo !== type) return false;
    if (nature !== "ALL" && bNature !== nature) return false;
    return true;
  });

  return { filteredExtratos, filteredBudget };
}

// ----------------------------------------------------------------------------
// 6. RENDERIZAÇÃO: ABA 1 — DASHBOARD E VISÃO GERENCIAL
// ----------------------------------------------------------------------------
function populateNatureFilter() {
  const select = document.getElementById("filterNature");
  const natures = [...new Set(AppState.matriz.map((m) => m.nature))];
  select.innerHTML = `<option value="ALL">Todas</option>` +
    natures.map((n) => `<option value="${n}">${n}</option>`).join("");
}

function renderDashboard() {
  const { filteredExtratos, filteredBudget } = getFilteredData();

  // Cálculo Realizado
  const incomeReal = filteredExtratos
    .filter((t) => t.type === "RECEITA")
    .reduce((acc, t) => acc + Math.abs(Number(t.vlr_transacao)), 0);

  const expenseReal = filteredExtratos
    .filter((t) => t.type === "DESPESA")
    .reduce((acc, t) => acc + Math.abs(Number(t.vlr_transacao)), 0);

  // Cálculo Budget
  const incomeBudget = filteredBudget
    .filter((b) => b.tipo === "RECEITA")
    .reduce((acc, b) => acc + Math.abs(Number(b.valor_budget)), 0);

  const expenseBudget = filteredBudget
    .filter((b) => b.tipo === "DESPESA")
    .reduce((acc, b) => acc + Math.abs(Number(b.valor_budget)), 0);

  // Saldo atual da última movimentação do extrato Sicredi
  const sortedByDate = [...AppState.extratos].sort((a, b) => b.dta_transacao.localeCompare(a.dta_transacao));
  const latestSaldo = sortedByDate.length ? sortedByDate[0].saldo_conta : 0;

  const netReal = incomeReal - expenseReal;
  const netBudget = incomeBudget - expenseBudget;

  // Atualização dos KPIs conforme Conceito (Fluxo de Caixa vs Avaliação Gerencial)
  const kpiPrimaryLabel = document.getElementById("kpiPrimaryLabel");
  const kpiBalanceValue = document.getElementById("kpiBalanceValue");
  const kpiNetResult = document.getElementById("kpiNetResult");
  const conceptBadgeTag = document.getElementById("conceptBadgeTag");

  if (AppState.conceptMode === "cashflow") {
    kpiPrimaryLabel.textContent = "SALDO DISPONÍVEL SICREDI (CAIXA)";
    kpiBalanceValue.textContent = formatBRL(latestSaldo);
    kpiNetResult.textContent = `${netReal >= 0 ? "+" : ""}${formatBRL(netReal)}`;
    kpiNetResult.className = `mono ${netReal >= 0 ? "text-income" : "text-expense"}`;
    conceptBadgeTag.textContent = "Regime de Caixa";
  } else {
    const adherenceSavings = netReal - netBudget;
    kpiPrimaryLabel.textContent = "RESULTADO OPERACIONAL (GERENCIAL)";
    kpiBalanceValue.textContent = formatBRL(netReal);
    kpiNetResult.textContent = `Meta: ${formatBRL(netBudget)} (${adherenceSavings >= 0 ? "+" : ""}${formatBRL(adherenceSavings)})`;
    kpiNetResult.className = `mono ${adherenceSavings >= 0 ? "text-income" : "text-expense"}`;
    conceptBadgeTag.textContent = "Avaliação Gerencial";
  }

  document.getElementById("kpiIncomeReal").textContent = formatBRL(incomeReal);
  document.getElementById("kpiIncomeBudget").textContent = `Budget: ${formatBRL(incomeBudget)}`;
  const incPct = incomeBudget > 0 ? Math.round((incomeReal / incomeBudget) * 100) : 100;
  document.getElementById("kpiIncomePct").textContent = `${incPct}%`;

  document.getElementById("kpiExpenseReal").textContent = formatBRL(expenseReal);
  document.getElementById("kpiExpenseBudget").textContent = `Budget: ${formatBRL(expenseBudget)}`;
  const expPct = expenseBudget > 0 ? Math.round((expenseReal / expenseBudget) * 100) : 0;
  document.getElementById("kpiExpensePct").textContent = `${expPct}%`;

  renderDashboardCharts(filteredExtratos, filteredBudget);
  renderComparativePanel(filteredExtratos, filteredBudget);
}

function renderDashboardCharts(filteredExtratos, filteredBudget) {
  const ctxMain = document.getElementById("mainDashboardChart").getContext("2d");
  const ctxDoughnut = document.getElementById("natureDoughnutChart").getContext("2d");

  if (AppState.charts.main) AppState.charts.main.destroy();
  if (AppState.charts.doughnut) AppState.charts.doughnut.destroy();

  const metricMode = AppState.filters.metric;
  const mainTitle = document.getElementById("mainChartTitle");
  const mainSubtitle = document.getElementById("mainChartSubtitle");

  if (AppState.conceptMode === "cashflow") {
    mainTitle.textContent = "Evolução do Fluxo de Caixa & Saldo";
    mainSubtitle.textContent = "Movimentações diárias realizadas no extrato Sicredi";

    const byDate = {};
    filteredExtratos
      .slice()
      .sort((a, b) => a.dta_transacao.localeCompare(b.dta_transacao))
      .forEach((tx) => {
        const day = tx.dta_transacao.slice(5); // MM-DD
        if (!byDate[day]) byDate[day] = { in: 0, out: 0, saldo: tx.saldo_conta };
        if (tx.type === "RECEITA") byDate[day].in += Math.abs(tx.vlr_transacao);
        else byDate[day].out += Math.abs(tx.vlr_transacao);
        byDate[day].saldo = tx.saldo_conta;
      });

    const labels = Object.keys(byDate);
    const dataIn = labels.map((d) => byDate[d].in);
    const dataOut = labels.map((d) => byDate[d].out);
    const dataSaldo = labels.map((d) => byDate[d].saldo);

    AppState.charts.main = new Chart(ctxMain, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            type: "line",
            label: "Saldo Conta",
            data: dataSaldo,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 3
          },
          {
            label: "Entradas",
            data: dataIn,
            backgroundColor: "#10b981",
            borderRadius: 4
          },
          {
            label: "Saídas",
            data: dataOut,
            backgroundColor: "#f43f5e",
            borderRadius: 4
          }
        ]
      },
      options: getChartOptions()
    });
  } else {
    mainTitle.textContent = "Avaliação Gerencial: Realizado vs. Budget";
    mainSubtitle.textContent = "Aderência orçamentária por natureza de conta";

    const natures = [...new Set(AppState.matriz.map((m) => m.nature))];
    const realData = [];
    const budgetData = [];

    natures.forEach((nat) => {
      const rSum = filteredExtratos
        .filter((t) => t.nature === nat)
        .reduce((acc, t) => acc + Math.abs(t.vlr_transacao), 0);

      const bSum = filteredBudget
        .filter((b) => {
          const rule = AppState.matriz.find((m) => Number(m.conta) === Number(b.cod_conta));
          return (rule ? rule.nature : "") === nat;
        })
        .reduce((acc, b) => acc + Math.abs(b.valor_budget), 0);

      realData.push(rSum);
      budgetData.push(bSum);
    });

    const shortLabels = natures.map((n) => n.split(" ")[0]);
    const datasets = [];

    if (metricMode === "BOTH" || metricMode === "REAL") {
      datasets.push({
        label: "Realizado (Extrato)",
        data: realData,
        backgroundColor: "#3b82f6",
        borderRadius: 5
      });
    }
    if (metricMode === "BOTH" || metricMode === "BUDGET") {
      datasets.push({
        label: "Budget (Projetado)",
        data: budgetData,
        backgroundColor: "rgba(148, 163, 184, 0.35)",
        borderColor: "#94a3b8",
        borderWidth: 1,
        borderRadius: 5
      });
    }

    AppState.charts.main = new Chart(ctxMain, {
      type: "bar",
      data: { labels: shortLabels, datasets },
      options: getChartOptions()
    });
  }

  // Gráfico Doughnut: Distribuição por Natureza (Despesas/Receitas filtradas)
  const natureTotals = {};
  filteredExtratos.forEach((tx) => {
    const key = `${tx.class}: ${tx.nature}`;
    natureTotals[key] = (natureTotals[key] || 0) + Math.abs(tx.vlr_transacao);
  });

  const dLabels = Object.keys(natureTotals);
  const dValues = Object.values(natureTotals);

  AppState.charts.doughnut = new Chart(ctxDoughnut, {
    type: "doughnut",
    data: {
      labels: dLabels,
      datasets: [{
        data: dValues,
        backgroundColor: ["#3b82f6", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "66%",
      plugins: {
        legend: {
          position: "right",
          labels: { color: "#94a3b8", font: { size: 10, family: "Inter" }, boxWidth: 10 }
        }
      }
    }
  });
}

function getChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#94a3b8", font: { size: 10, family: "Inter" }, boxWidth: 10 }
      }
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 9.5 } },
        grid: { display: false }
      },
      y: {
        ticks: {
          color: "#64748b",
          font: { size: 9.5 },
          callback: (v) => "R$ " + (v / 1000).toFixed(0) + "k"
        },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };
}

function renderComparativePanel(filteredExtratos, filteredBudget) {
  const container = document.getElementById("comparativeList");
  const accountsMap = {};

  AppState.matriz.forEach((m) => {
    if (AppState.filters.type !== "ALL" && m.type !== AppState.filters.type) return;
    if (AppState.filters.nature !== "ALL" && m.nature !== AppState.filters.nature) return;
    accountsMap[m.conta] = {
      conta: m.conta,
      desc_conta: m.desc_conta,
      type: m.type,
      nature: m.nature,
      class: m.class,
      real: 0,
      budget: 0
    };
  });

  filteredExtratos.forEach((tx) => {
    if (tx.cod_conta && accountsMap[tx.cod_conta]) {
      accountsMap[tx.cod_conta].real += Math.abs(tx.vlr_transacao);
    }
  });

  filteredBudget.forEach((b) => {
    if (b.cod_conta && accountsMap[b.cod_conta]) {
      accountsMap[b.cod_conta].budget += Math.abs(b.valor_budget);
    }
  });

  const rows = Object.values(accountsMap).filter((r) => r.real > 0 || r.budget > 0);

  if (!rows.length) {
    container.innerHTML = `<p class="card-subtitle">Nenhum dado comparativo para os filtros ativos.</p>`;
    return;
  }

  container.innerHTML = rows.map((row) => {
    const pct = row.budget > 0 ? Math.round((row.real / row.budget) * 100) : 100;
    const isOverrun = row.type === "DESPESA" && row.real > row.budget && row.budget > 0;
    const barColor = isOverrun
      ? "var(--color-expense)"
      : row.type === "RECEITA"
      ? "var(--color-income)"
      : "var(--color-accent)";

    return `
      <div class="comp-item">
        <div class="comp-top">
          <div class="comp-title">
            <span class="comp-type-dot ${row.type === "RECEITA" ? "income" : "expense"}"></span>
            <span>${row.desc_conta}</span>
          </div>
          <span class="kpi-badge ${isOverrun ? "expense" : "income"}">${pct}%</span>
        </div>
        <div class="comp-values mono">
          <span>Real: <strong>${formatBRL(row.real)}</strong></span>
          <span>Budget: ${formatBRL(row.budget)} (${row.class})</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${Math.min(pct, 100)}%; background: ${barColor};"></div>
        </div>
      </div>
    `;
  }).join("");
}

// ----------------------------------------------------------------------------
// 7. RENDERIZAÇÃO: ABA 2 — EXTRATO SICREDI E EDIÇÃO DE CLASSIFICAÇÃO
// ----------------------------------------------------------------------------
function renderStatementTab() {
  const searchQuery = normalizeStr(document.getElementById("searchStatement").value);
  const classFilter = document.getElementById("filterStatementClass").value;

  const list = AppState.extratos
    .slice()
    .sort((a, b) => b.dta_transacao.localeCompare(a.dta_transacao))
    .filter((tx) => {
      if (classFilter === "UNCLASSIFIED" && tx.cod_conta !== null) return false;
      if ((classFilter === "Fixa" || classFilter === "Variável") && tx.class !== classFilter) return false;
      if (searchQuery) {
        const hay = normalizeStr(`${tx.desc_documento} ${tx.desc_conta} ${tx.nature} ${tx.cod_documento}`);
        return hay.includes(searchQuery);
      }
      return true;
    });

  // Estatísticas rápidas de classificação
  const totalTx = AppState.extratos.length;
  const classifiedTx = AppState.extratos.filter((t) => t.cod_conta !== null).length;
  const fixedTotal = AppState.extratos
    .filter((t) => t.class === "Fixa" && t.type === "DESPESA")
    .reduce((a, b) => a + Math.abs(b.vlr_transacao), 0);

  document.getElementById("statementStats").innerHTML = `
    <div class="stat-pill">
      <span>Classificadas</span>
      <strong class="text-income">${classifiedTx}/${totalTx}</strong>
    </div>
    <div class="stat-pill">
      <span>Despesas Fixas</span>
      <strong>${formatBRL(fixedTotal)}</strong>
    </div>
    <div class="stat-pill">
      <span>Motor MATRIZ</span>
      <strong class="text-income">${Math.round((classifiedTx / totalTx) * 100)}% Match</strong>
    </div>
  `;

  const container = document.getElementById("statementList");
  container.innerHTML = list.map((tx) => {
    const isIncome = tx.type === "RECEITA";
    const iconName = isIncome ? "arrow-down-left" : "arrow-up-right";

    return `
      <div class="tx-card" data-txid="${tx.id_transacao}">
        <div class="tx-left">
          <div class="tx-icon ${isIncome ? "income" : "expense"}">
            <i data-lucide="${iconName}"></i>
          </div>
          <div class="tx-info">
            <div class="tx-doc">${tx.desc_documento}</div>
            <div class="tx-meta">
              <span class="tx-badge ${tx.cod_conta ? "matched" : "unclassified"}">
                ${tx.cod_conta ? `${tx.cod_conta} • ${tx.desc_conta}` : "Sem Vínculo MATRIZ"}
              </span>
              <span class="tx-badge">${tx.class}</span>
            </div>
          </div>
        </div>
        <div class="tx-right">
          <div class="tx-amount mono ${isIncome ? "text-income" : "text-expense"}">
            ${isIncome ? "+" : "-"}${formatBRL(Math.abs(tx.vlr_transacao))}
          </div>
          <div class="tx-date mono">${tx.dta_transacao} • ${tx.cod_documento}</div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();

  // Eventos de clique para abrir o modal de reclassificação
  container.querySelectorAll(".tx-card").forEach((card) => {
    card.addEventListener("click", () => openClassifyModal(card.dataset.txid));
  });
}

function openClassifyModal(txId) {
  const tx = AppState.extratos.find((t) => t.id_transacao === txId);
  if (!tx) return;

  document.getElementById("editTxId").value = tx.id_transacao;
  document.getElementById("editTxDesc").value = tx.desc_documento;
  document.getElementById("editTxDate").value = tx.dta_transacao;
  document.getElementById("editTxValue").value = formatBRL(tx.vlr_transacao);
  document.getElementById("editNewTag").value = "";

  const select = document.getElementById("editTxAccount");
  select.innerHTML = AppState.matriz.map((m) => `
    <option value="${m.conta}" ${Number(tx.cod_conta) === Number(m.conta) ? "selected" : ""}>
      [${m.conta}] ${m.type} (${m.class}) — ${m.desc_conta}
    </option>
  `).join("");

  document.getElementById("modalClassify").classList.remove("hidden");
}

// ----------------------------------------------------------------------------
// 8. RENDERIZAÇÃO: ABA 3 — GESTÃO DE FORECAST (BUDGET)
// ----------------------------------------------------------------------------
function renderForecastTab() {
  const totalRec = AppState.budget
    .filter((b) => b.tipo === "RECEITA")
    .reduce((a, b) => a + Number(b.valor_budget), 0);

  const totalDesp = AppState.budget
    .filter((b) => b.tipo === "DESPESA")
    .reduce((a, b) => a + Number(b.valor_budget), 0);

  const saldoProj = totalRec - totalDesp;

  document.getElementById("forecastSummaryBar").innerHTML = `
    <div class="stat-pill">
      <span>Receita Projetada</span>
      <strong class="text-income">${formatBRL(totalRec)}</strong>
    </div>
    <div class="stat-pill">
      <span>Despesa Projetada</span>
      <strong class="text-expense">${formatBRL(totalDesp)}</strong>
    </div>
    <div class="stat-pill">
      <span>Saldo Forecast</span>
      <strong class="${saldoProj >= 0 ? "text-income" : "text-expense"}">${formatBRL(saldoProj)}</strong>
    </div>
  `;

  // Agrupamento Dinâmico: Por Mês, Por Natureza ou Por Conta
  const groups = {};
  AppState.budget.forEach((item, idx) => {
    const rule = AppState.matriz.find((m) => Number(m.conta) === Number(item.cod_conta));
    let groupKey = "";

    if (AppState.forecastGroup === "month") {
      groupKey = `Competência: ${item.dt_venc.slice(0, 7)}`;
    } else if (AppState.forecastGroup === "nature") {
      groupKey = rule ? rule.nature : "Outras Naturezas";
    } else {
      groupKey = `[${item.cod_conta}] ${item.desc_conta}`;
    }

    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push({ ...item, _index: idx, _nature: rule ? rule.nature : "" });
  });

  const container = document.getElementById("forecastContainer");
  container.innerHTML = Object.entries(groups).map(([gTitle, items]) => {
    const netGroup = items.reduce((acc, it) => {
      return acc + (it.tipo === "RECEITA" ? Number(it.valor_budget) : -Number(it.valor_budget));
    }, 0);

    return `
      <div class="forecast-group-card">
        <div class="forecast-group-header">
          <span class="forecast-group-title">${gTitle}</span>
          <span class="forecast-group-total mono ${netGroup >= 0 ? "text-income" : "text-expense"}">
            ${formatBRL(netGroup)}
          </span>
        </div>
        ${items.map((it) => `
          <div class="forecast-item-row" data-bindex="${it._index}">
            <div class="forecast-item-left">
              <span class="forecast-item-name">${it.desc_conta}</span>
              <span class="forecast-item-sub">Venc: ${it.dt_venc} • ${it.obs_budget || "Sem observações"}</span>
            </div>
            <div class="mono ${it.tipo === "RECEITA" ? "text-income" : "text-expense"}" style="font-weight:700;">
              ${it.tipo === "RECEITA" ? "+" : "-"}${formatBRL(it.valor_budget)}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");

  container.querySelectorAll(".forecast-item-row").forEach((row) => {
    row.addEventListener("click", () => openBudgetModal(Number(row.dataset.bindex)));
  });
}

function openBudgetModal(editIndex = null) {
  const select = document.getElementById("budgetCodConta");
  select.innerHTML = AppState.matriz.map((m) => `
    <option value="${m.conta}">[${m.conta}] ${m.type} — ${m.desc_conta}</option>
  `).join("");

  const btnDelete = document.getElementById("btnDeleteBudget");

  if (editIndex !== null && AppState.budget[editIndex]) {
    const item = AppState.budget[editIndex];
    document.getElementById("modalBudgetTitle").textContent = "Editar Projeção (Budget)";
    document.getElementById("budgetEditIndex").value = editIndex;
    document.getElementById("budgetDtVenc").value = item.dt_venc;
    document.getElementById("budgetValor").value = item.valor_budget;
    document.getElementById("budgetCodConta").value = item.cod_conta;
    document.getElementById("budgetObs").value = item.obs_budget || "";
    btnDelete.classList.remove("hidden");
  } else {
    document.getElementById("modalBudgetTitle").textContent = "Novo Item de Forecast";
    document.getElementById("budgetEditIndex").value = "";
    document.getElementById("budgetDtVenc").value = "2026-11-25";
    document.getElementById("budgetValor").value = "";
    document.getElementById("budgetObs").value = "";
    btnDelete.classList.add("hidden");
  }

  document.getElementById("modalBudget").classList.remove("hidden");
}

// ----------------------------------------------------------------------------
// 9. INTEGRAÇÃO COM GOOGLE GEMINI IA (ABA 4)
// ----------------------------------------------------------------------------
function buildFinancialSummaryPayload() {
  const { filteredExtratos, filteredBudget } = getFilteredData();

  const totalRecReal = filteredExtratos.filter((t) => t.type === "RECEITA").reduce((a, b) => a + Math.abs(b.vlr_transacao), 0);
  const totalDespReal = filteredExtratos.filter((t) => t.type === "DESPESA").reduce((a, b) => a + Math.abs(b.vlr_transacao), 0);
  const totalRecBud = filteredBudget.filter((b) => b.tipo === "RECEITA").reduce((a, b) => a + Math.abs(b.valor_budget), 0);
  const totalDespBud = filteredBudget.filter((b) => b.tipo === "DESPESA").reduce((a, b) => a + Math.abs(b.valor_budget), 0);

  // Identificar desvios de budget por conta
  const deviations = [];
  AppState.matriz.filter((m) => m.type === "DESPESA").forEach((m) => {
    const real = filteredExtratos.filter((t) => Number(t.cod_conta) === Number(m.conta)).reduce((a, b) => a + Math.abs(b.vlr_transacao), 0);
    const bud = filteredBudget.filter((b) => Number(b.cod_conta) === Number(m.conta)).reduce((a, b) => a + Math.abs(b.valor_budget), 0);
    if (real > 0 || bud > 0) {
      deviations.push({
        conta: m.desc_conta,
        classe: m.class,
        realizado: real,
        budget: bud,
        desvio_brl: +(real - bud).toFixed(2)
      });
    }
  });

  return {
    periodo_analisado: AppState.period,
    moeda: "BRL",
    receita_realizada: totalRecReal,
    receita_projetada: totalRecBud,
    despesa_realizada: totalDespReal,
    despesa_projetada: totalDespBud,
    resultado_liquido: +(totalRecReal - totalDespReal).toFixed(2),
    taxa_poupanca_pct: totalRecReal > 0 ? +(((totalRecReal - totalDespReal) / totalRecReal) * 100).toFixed(1) : 0,
    desvios_por_categoria: deviations
  };
}

function renderAiTabPreview() {
  const summary = buildFinancialSummaryPayload();
  document.getElementById("aiPayloadPreview").textContent = JSON.stringify(summary, null, 2);
}

async function fetchGeminiInsights() {
  const container = document.getElementById("aiResponseContainer");
  const summary = buildFinancialSummaryPayload();
  renderAiTabPreview();

  container.innerHTML = `
    <div class="ai-insight-block">
      <div class="ai-insight-header">Processando Diagnóstico Financeiro com Gemini IA...</div>
      <div class="ai-insight-body">Analisando correlações entre db_extratos_sicredi, desvios de budget e indicadores macroeconômicos (Selic/IPCA).</div>
    </div>
  `;

  const promptText = `
Você é um Especialista em Finanças Pessoais e Estrategista Econômico no Brasil.
Analise o seguinte balanço financeiro consolidado (extraído do Sicredi e comparado ao Forecast/Budget):
${JSON.stringify(summary)}

Retorne exatamente 3 blocos de recomendação em formato JSON com as chaves:
"alertas_estouro": texto objetivo sobre as contas que estouraram ou pressionaram o budget,
"oportunidades_economia": recomendações práticas de realocação entre despesas fixas e variáveis,
"cenario_economico": análise de alocação do excedente de caixa considerando juros reais (CDI/Selic e inflação no Brasil).
Responda apenas com JSON válido.
  `.trim();

  // Caso o usuário tenha informado uma API Key válida do Google Gemini, realiza a chamada real via Fetch API
  if (AppState.geminiApiKey && AppState.geminiApiKey.startsWith("AIza")) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(AppState.geminiApiKey)}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!response.ok) throw new Error(`Status HTTP: ${response.status}`);
      const result = await response.json();
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      const parsed = JSON.parse(rawText);
      renderFormattedAiBlocks(parsed, "Google Gemini 2.5 Flash (API Live)");
      return;
    } catch (err) {
      console.warn("Erro na chamada da API Gemini, acionando motor analítico local:", err);
      showToast("Chave inválida ou erro de rede — exibindo análise local");
    }
  }

  // Resposta Analítica Estruturada (Caso sem API Key ou modo demonstração no GitHub Pages)
  const overruns = summary.desvios_por_categoria.filter((d) => d.desvio_brl > 0);
  const overrunText = overruns.length
    ? overruns.map((o) => `${o.conta} (+${formatBRL(o.desvio_brl)} acima do budget)`).join("; ")
    : "Nenhuma categoria ultrapassou o teto orçamentário no período selecionado.";

  const fallbackAnalysis = {
    alertas_estouro: `Identificamos desvios relevantes nas seguintes rubricas: ${overrunText}. Recomenda-se revisar o limite semanal de gastos variáveis no cartão Mastercard Black para preservar a meta do trimestre.`,
    oportunidades_economia: `Sua taxa de poupança atual está em ${summary.taxa_poupanca_pct}% (${formatBRL(summary.resultado_liquido)} de superávit líquido). Ao limitar as despesas de 'Estilo de Vida & Lazer' e 'Fatura Cartão' ao teto planejado na tabela budget, você libera aproximadamente R$ 650,00/mês adicionais.`,
    cenario_economico: `No cenário macroeconômico brasileiro atual com taxas reais atrativas em renda fixa pós-fixada e IPCA+, direcione o excedente operacional (${formatBRL(Math.max(summary.resultado_liquido, 0))}) imediatamente após o crédito salarial para liquidez diária indexada a 100%+ do CDI no SicrediInvest e títulos indexados à inflação de médio prazo.`
  };

  setTimeout(() => {
    renderFormattedAiBlocks(fallbackAnalysis, "Motor Analítico FinCore (Configure sua API Key para chamada Live)");
  }, 500);
}

function renderFormattedAiBlocks(data, sourceLabel) {
  const container = document.getElementById("aiResponseContainer");
  container.innerHTML = `
    <div class="ai-insight-block alert">
      <div class="ai-insight-header text-expense">Alertas de Estouro de Budget</div>
      <div class="ai-insight-body">${data.alertas_estouro}</div>
    </div>
    <div class="ai-insight-block opportunity">
      <div class="ai-insight-header text-income">Oportunidades de Otimização & Caixa</div>
      <div class="ai-insight-body">${data.oportunidades_economia}</div>
    </div>
    <div class="ai-insight-block">
      <div class="ai-insight-header" style="color:#c4b5fd;">Visão Macroeconômica & Alocação (${sourceLabel})</div>
      <div class="ai-insight-body">${data.cenario_economico}</div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 10. INICIALIZAÇÃO E EVENT LISTENERS (UI & NAVEGAÇÃO MOBILE)
// ----------------------------------------------------------------------------
function refreshAllViews() {
  renderDashboard();
  renderStatementTab();
  renderForecastTab();
  renderAiTabPreview();
}

document.addEventListener("DOMContentLoaded", async () => {
  lucide.createIcons();

  await loadDatabaseData();
  classifyTransactions(false);
  populateNatureFilter();
  refreshAllViews();

  // Renderizar um insight inicial na aba de IA
  fetchGeminiInsights();

  // Navegação Inferior (Bottom Navigation Tabs)
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.dataset.target;
      document.getElementById(targetId).classList.add("active");

      if (targetId === "tab-dashboard") renderDashboard();
    });
  });

  // Toggle Conceito: Fluxo de Caixa vs Avaliação Gerencial
  document.querySelectorAll(".concept-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".concept-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.conceptMode = btn.dataset.concept;
      renderDashboard();
    });
  });

  // Pílulas de Período (Semana, Mês, Trimestre, Ano)
  document.querySelectorAll(".period-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".period-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      AppState.period = pill.dataset.period;
      refreshAllViews();
    });
  });

  // Filtros Dinâmicos do Dashboard
  ["filterType", "filterNature", "filterMetric"].forEach((id) => {
    document.getElementById(id).addEventListener("change", (e) => {
      if (id === "filterType") AppState.filters.type = e.target.value;
      if (id === "filterNature") AppState.filters.nature = e.target.value;
      if (id === "filterMetric") AppState.filters.metric = e.target.value;
      renderDashboard();
    });
  });

  // Busca e Filtros do Extrato Sicredi
  document.getElementById("searchStatement").addEventListener("input", renderStatementTab);
  document.getElementById("filterStatementClass").addEventListener("change", renderStatementTab);

  document.getElementById("btnReclassifyAll").addEventListener("click", () => {
    const count = classifyTransactions(true);
    refreshAllViews();
    showToast(`${count} transações reclassificadas via MATRIZ!`);
  });

  // Salvar Classificação Manual e Atualizar Tags na MATRIZ
  document.getElementById("formClassify").addEventListener("submit", async (e) => {
    e.preventDefault();
    const txId = document.getElementById("editTxId").value;
    const selectedConta = Number(document.getElementById("editTxAccount").value);
    const newTag = normalizeStr(document.getElementById("editNewTag").value);

    const rule = AppState.matriz.find((m) => Number(m.conta) === selectedConta);
    if (rule && newTag) {
      const currentTags = rule.desc_extrato ? rule.desc_extrato.split(",").map((t) => t.trim()) : [];
      if (!currentTags.includes(newTag)) {
        currentTags.push(newTag);
        rule.desc_extrato = currentTags.join(",");
        await syncTableChangeToBackend("MATRIZ", "UPDATE_TAG", rule);
      }
    }

    const txIndex = AppState.extratos.findIndex((t) => t.id_transacao === txId);
    if (txIndex > -1 && rule) {
      AppState.extratos[txIndex] = enrichTransaction(AppState.extratos[txIndex], rule, newTag || "MANUAL");
      await syncTableChangeToBackend("db_extratos_sicredi", "UPDATE_CLASSIFICATION", AppState.extratos[txIndex]);
    }

    // Reprocessa para aplicar a nova tag a transações similares
    classifyTransactions(false);
    document.getElementById("modalClassify").classList.add("hidden");
    refreshAllViews();
    showToast("Classificação atualizada e sincronizada!");
  });

  // Agrupamento de Forecast (Por Mês, Natureza, Conta)
  document.querySelectorAll(".group-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".group-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      AppState.forecastGroup = tab.dataset.group;
      renderForecastTab();
    });
  });

  document.getElementById("btnAddBudget").addEventListener("click", () => openBudgetModal(null));

  // Salvar / Editar Item de Budget
  document.getElementById("formBudget").addEventListener("submit", async (e) => {
    e.preventDefault();
    const editIdx = document.getElementById("budgetEditIndex").value;
    const codConta = Number(document.getElementById("budgetCodConta").value);
    const rule = AppState.matriz.find((m) => Number(m.conta) === codConta);

    const entry = {
      dt_venc: document.getElementById("budgetDtVenc").value,
      cod_conta: codConta,
      desc_conta: rule ? rule.desc_conta : "Conta Geral",
      valor_budget: parseFloat(document.getElementById("budgetValor").value) || 0,
      tipo: rule ? rule.type : "DESPESA",
      obs_budget: document.getElementById("budgetObs").value
    };

    if (editIdx !== "") {
      AppState.budget[Number(editIdx)] = entry;
      await syncTableChangeToBackend("budget", "UPDATE", entry);
    } else {
      AppState.budget.push(entry);
      await syncTableChangeToBackend("budget", "INSERT", entry);
    }

    document.getElementById("modalBudget").classList.add("hidden");
    refreshAllViews();
    showToast("Forecast salvo com sucesso!");
  });

  document.getElementById("btnDeleteBudget").addEventListener("click", async () => {
    const editIdx = document.getElementById("budgetEditIndex").value;
    if (editIdx !== "") {
      const removed = AppState.budget.splice(Number(editIdx), 1);
      await syncTableChangeToBackend("budget", "DELETE", removed[0]);
      document.getElementById("modalBudget").classList.add("hidden");
      refreshAllViews();
      showToast("Item removido do Budget.");
    }
  });

  // Configuração da API Key do Gemini e Geração de Insights
  document.getElementById("geminiApiKeyInput").value = AppState.geminiApiKey;
  document.getElementById("btnSaveApiKey").addEventListener("click", () => {
    AppState.geminiApiKey = document.getElementById("geminiApiKeyInput").value.trim();
    localStorage.setItem("fincore_gemini_key", AppState.geminiApiKey);
    showToast("Chave da API Gemini armazenada localmente!");
  });

  document.getElementById("btnGenerateInsights").addEventListener("click", fetchGeminiInsights);

  // Modal de Configurações de Endpoint REST
  document.getElementById("btnOpenSettings").addEventListener("click", () => {
    document.getElementById("apiEndpointInput").value = AppState.apiEndpoint;
    document.getElementById("dbStatusSummary").innerHTML = `
      • MATRIZ: ${AppState.matriz.length} contas parametrizadas<br/>
      • budget: ${AppState.budget.length} projeções cadastradas<br/>
      • db_extratos_sicredi: ${AppState.extratos.length} lançamentos
    `;
    document.getElementById("modalSettings").classList.remove("hidden");
  });

  document.getElementById("formSettings").addEventListener("submit", async (e) => {
    e.preventDefault();
    AppState.apiEndpoint = document.getElementById("apiEndpointInput").value.trim();
    localStorage.setItem("fincore_api_endpoint", AppState.apiEndpoint);
    document.getElementById("modalSettings").classList.add("hidden");
    await loadDatabaseData();
    classifyTransactions(false);
    refreshAllViews();
  });

  document.getElementById("btnResetMock").addEventListener("click", () => {
    localStorage.removeItem("fincore_table_matriz");
    localStorage.removeItem("fincore_table_budget");
    localStorage.removeItem("fincore_table_extratos");
    AppState.matriz = structuredClone(INITIAL_MATRIZ);
    AppState.budget = structuredClone(INITIAL_BUDGET);
    AppState.extratos = structuredClone(INITIAL_EXTRATOS_SICREDI);
    classifyTransactions(true);
    refreshAllViews();
    document.getElementById("modalSettings").classList.add("hidden");
    showToast("Dados originais restaurados!");
  });

  document.getElementById("btnSyncApi").addEventListener("click", async () => {
    await loadDatabaseData();
    classifyTransactions(false);
    refreshAllViews();
    showToast("Base de dados atualizada!");
  });

  // Fechar Modais
  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modal).classList.add("hidden");
    });
  });
});