/**
 * FINANCE MANAGER PRO - FRONTEND ENGINE (js/script.js)
 * Conectado ao Google Apps Script Web App e GitHub Pages
 */

const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbwim_LWD_imCGtxeQBwoo3gwGn9d0Cnp-RE5YIhhAHlIW4PZ0mgBgpwIijPuhspRYy1lA/exec';
const GITHUB_PAGES_URL = 'https://lucasfazioni.github.io/finance_manager/';

// ============================================================================
// 1. BASE REAL SINCRONIZADA DA MATRIZ (52 CONTAS) E SEMENTE DO BUDGET/CARTÕES
// ============================================================================
const SEED_MATRIZ = [
	{ Conta: 10011, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'CONDOMÍNIO', class: 'DESPESA', desc_extrato: '5489384000171 BRWEB, 05489384000171 BRWEB, 05489384000171 BRCONDOMINIO' },
	{ Conta: 10012, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'ENERGIA', class: 'DESPESA', desc_extrato: '02016440000162 RGE' },
	{ Conta: 10013, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'INTERNET', class: 'DESPESA', desc_extrato: '31748174009893 VERO, 31748174004824 VERO' },
	{ Conta: 10014, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'GÁS', class: 'DESPESA', desc_extrato: '' },
	{ Conta: 10015, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'FINANCIAMENTO', class: 'DESPESA', desc_extrato: '00360305000104 GCI CAIXA' },
	{ Conta: 10016, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'LINHA CELULAR', class: 'DESPESA', desc_extrato: '02558157000162 TELEFONICA, DEB. RECARGA' },
	{ Conta: 10017, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'IPTU', class: 'DESPESA', desc_extrato: '88254883000107 MUNICIPIO' },
	{ Conta: 10018, Tipo: 'FIXO', Natureza: 'MORADIA', 'Descrição Conta': 'SEGURO CASA', class: 'DESPESA', desc_extrato: 'ALLIANZ SEGUROS' },
	{ Conta: 10021, Tipo: 'VARIÁVEL', Natureza: 'TRANSPORTE', 'Descrição Conta': 'COMBUSTÍVEL', class: 'DESPESA', desc_extrato: 'POSTO, COMBUSTIVEIS, IPIRANGA, SHELL' },
	{ Conta: 10022, Tipo: 'FIXO', Natureza: 'TRANSPORTE', 'Descrição Conta': 'UBER', class: 'DESPESA', desc_extrato: '17895646000187 UBER, 18033552000161 99 TECNOLOGIA' },
	{ Conta: 10023, Tipo: 'FIXO', Natureza: 'TRANSPORTE', 'Descrição Conta': 'SEGURO VEÍCULO', class: 'DESPESA', desc_extrato: 'ANDRE MESQUITA NUNES' },
	{ Conta: 10024, Tipo: 'FIXO', Natureza: 'TRANSPORTE', 'Descrição Conta': 'FINANCIAMENTO', class: 'DESPESA', desc_extrato: 'FINANC VEICULO' },
	{ Conta: 10025, Tipo: 'FIXO', Natureza: 'TRANSPORTE', 'Descrição Conta': 'VAN ESCOLAR', class: 'DESPESA', desc_extrato: 'VAN ESCOLAR' },
	{ Conta: 10026, Tipo: 'FIXO', Natureza: 'TRANSPORTE', 'Descrição Conta': 'IPVA', class: 'DESPESA', desc_extrato: 'IPVA, DETRAN' },
	{ Conta: 10031, Tipo: 'VARIÁVEL', Natureza: 'SAÚDE', 'Descrição Conta': 'FARMÁCIA', class: 'DESPESA', desc_extrato: 'PANVEL, SAO JOAO, RAIA, FARMACIA' },
	{ Conta: 10032, Tipo: 'FIXO', Natureza: 'SAÚDE', 'Descrição Conta': 'CONSULTAS', class: 'DESPESA', desc_extrato: 'CLINICA, CONSULTA' },
	{ Conta: 10033, Tipo: 'FIXO', Natureza: 'SAÚDE', 'Descrição Conta': 'MENSALIDADE', class: 'DESPESA', desc_extrato: 'UNIMED, DOCTOR CLIN' },
	{ Conta: 10034, Tipo: 'FIXO', Natureza: 'SAÚDE', 'Descrição Conta': 'SEGURO VIDA', class: 'DESPESA', desc_extrato: 'ICATU, PRUDENTIAL, SEGURO VIDA' },
	{ Conta: 10041, Tipo: 'FIXO', Natureza: 'EDUCAÇÃO', 'Descrição Conta': 'MENSALIDADE', class: 'DESPESA', desc_extrato: 'UNIVERSIDADE, ESCOLA, COLEGIO' },
	{ Conta: 10042, Tipo: 'FIXO', Natureza: 'EDUCAÇÃO', 'Descrição Conta': 'CURSOS', class: 'DESPESA', desc_extrato: 'CURSO, ALURA, UDEMY' },
	{ Conta: 10043, Tipo: 'FIXO', Natureza: 'EDUCAÇÃO', 'Descrição Conta': 'EDUCAÇÃO INFANTIL', class: 'DESPESA', desc_extrato: 'EDUCACAO INFANTIL, ESCOLINHA' },
	{ Conta: 10062, Tipo: 'FIXO', Natureza: 'FINANCEIRO', 'Descrição Conta': 'CONSÓRCIO', class: 'DESPESA', desc_extrato: 'CONSORCIO' },
	{ Conta: 11021, Tipo: 'VARIÁVEL', Natureza: 'CASA', 'Descrição Conta': 'ELETRÔNICOS', class: 'DESPESA', desc_extrato: 'MAGAZINE, KABUM, AMAZON' },
	{ Conta: 11022, Tipo: 'VARIÁVEL', Natureza: 'CASA', 'Descrição Conta': 'REFORMAS', class: 'DESPESA', desc_extrato: 'LEROY, TUMELERO, FERRAGEM, REFORMA' },
	{ Conta: 11027, Tipo: 'VARIÁVEL', Natureza: 'TRANSPORTE', 'Descrição Conta': 'MANUTENÇÃO CARRO', class: 'DESPESA', desc_extrato: 'OFICINA, AUTO PECAS, PNEUS' },
	{ Conta: 11028, Tipo: 'VARIÁVEL', Natureza: 'TRANSPORTE', 'Descrição Conta': 'ALOCAÇÕES', class: 'DESPESA', desc_extrato: 'ESTACIONAMENTO, PEDAGIO, VELOE' },
	{ Conta: 11029, Tipo: 'VARIÁVEL', Natureza: 'TRANSPORTE', 'Descrição Conta': 'MULTAS', class: 'DESPESA', desc_extrato: 'MULTA TRANSITO' },
	{ Conta: 11031, Tipo: 'VARIÁVEL', Natureza: 'CONSUMO', 'Descrição Conta': 'ROUPAS', class: 'DESPESA', desc_extrato: 'RENNER, RIACHUELO, ZARA, ROUPAS' },
	{ Conta: 11032, Tipo: 'VARIÁVEL', Natureza: 'CONSUMO', 'Descrição Conta': 'PRESENTES', class: 'DESPESA', desc_extrato: 'PRESENTE, BRINQUEDOS' },
	{ Conta: 11033, Tipo: 'VARIÁVEL', Natureza: 'CONSUMO', 'Descrição Conta': 'DESPESAS DIVERSAS', class: 'DESPESA', desc_extrato: 'DIVERSOS' },
	{ Conta: 11034, Tipo: 'VARIÁVEL', Natureza: 'CONSUMO', 'Descrição Conta': 'ESTÉTICA', class: 'DESPESA', desc_extrato: 'SALAO, BARBEARIA, ESTETICA, KETLIN' },
	{ Conta: 11041, Tipo: 'VARIÁVEL', Natureza: 'LAZER', 'Descrição Conta': 'CINEMA', class: 'DESPESA', desc_extrato: 'CINEMARK, CINEPOLIS, NETFLIX, SPOTIFY' },
	{ Conta: 11042, Tipo: 'VARIÁVEL', Natureza: 'LAZER', 'Descrição Conta': 'VIAGENS', class: 'DESPESA', desc_extrato: 'HOTEL, AIRBNB, LATAM, AZUL, GOL' },
	{ Conta: 11043, Tipo: 'VARIÁVEL', Natureza: 'LAZER', 'Descrição Conta': 'EVENTOS', class: 'DESPESA', desc_extrato: 'SYMPLA, INGRESSO, EVENTO' },
	{ Conta: 11051, Tipo: 'VARIÁVEL', Natureza: 'ALIMENTAÇÃO', 'Descrição Conta': 'MERCADO', class: 'DESPESA', desc_extrato: 'SUPERMERCADO, ZAFFARI, CASA DE CARNES, VIVA BEM' },
	{ Conta: 11052, Tipo: 'VARIÁVEL', Natureza: 'ALIMENTAÇÃO', 'Descrição Conta': 'LANCHES', class: 'DESPESA', desc_extrato: 'IFOOD, RESTAURANTE, LANCHES, PADARIA' },
	{ Conta: 11053, Tipo: 'VARIÁVEL', Natureza: 'ALIMENTAÇÃO', 'Descrição Conta': 'SUPLEMENTOS', class: 'DESPESA', desc_extrato: 'GROWTH, MAX TITANIUM, SUPLEMENTO' },
	{ Conta: 11061, Tipo: 'VARIÁVEL', Natureza: 'FINANCEIRO', 'Descrição Conta': 'CARTÃO DE CRÉDITO', class: 'DESPESA', desc_extrato: 'FATURA CARTAO, DEB.CTA.FATURA, PAGAMENTO CARTAO' },
	{ Conta: 11062, Tipo: 'VARIÁVEL', Natureza: 'FINANCEIRO', 'Descrição Conta': 'JUROS', class: 'DESPESA', desc_extrato: 'IOF, JUROS' },
	{ Conta: 11063, Tipo: 'VARIÁVEL', Natureza: 'FINANCEIRO', 'Descrição Conta': 'TARIFAS', class: 'DESPESA', desc_extrato: 'CESTA DE RELACIONAMENTO, TARIFA' },
	{ Conta: 11064, Tipo: 'VARIÁVEL', Natureza: 'FINANCEIRO', 'Descrição Conta': 'APLICAÇÃO', class: 'DESPESA', desc_extrato: 'APLICACAO FINANCEIRA, SICREDI INVEST' },
	{ Conta: 11065, Tipo: 'VARIÁVEL', Natureza: 'FINANCEIRO', 'Descrição Conta': 'DÉBITOS', class: 'DESPESA', desc_extrato: 'DEBITO CONTA' },
	{ Conta: 11066, Tipo: 'VARIÁVEL', Natureza: 'EVENTUAL', 'Descrição Conta': 'PAGAMENTOS EXTRAS', class: 'DESPESA', desc_extrato: 'PIX_DEB, PAGAMENTO EXTRA' },
	{ Conta: 11071, Tipo: 'VARIÁVEL', Natureza: 'EDUCAÇÃO', 'Descrição Conta': 'LIVRARIA', class: 'DESPESA', desc_extrato: 'LIVRARIA, AMAZON LIVROS' },
	{ Conta: 20011, Tipo: 'FIXO', Natureza: 'RENDA PRINCIPAL', 'Descrição Conta': 'SALÁRIO', class: 'RECEITA', desc_extrato: 'CREDITO SALARIO, FOLHA PAGAMENTO' },
	{ Conta: 20012, Tipo: 'FIXO', Natureza: 'RENDA PRINCIPAL', 'Descrição Conta': 'ADTO. SALARIO', class: 'RECEITA', desc_extrato: 'ADIANTAMENTO SALARIAL, ADTO SALARIO' },
	{ Conta: 20013, Tipo: 'FIXO', Natureza: 'BENEFÍCIOS', 'Descrição Conta': 'VALE / AUXÍLIO', class: 'RECEITA', desc_extrato: 'VALE_ALIMENTACAO, AUXILIO CRECHE' },
	{ Conta: 20014, Tipo: 'FIXO', Natureza: 'EVENTUAL', 'Descrição Conta': 'FÉRIAS', class: 'RECEITA', desc_extrato: 'CREDITO FERIAS' },
	{ Conta: 21011, Tipo: 'VARIÁVEL', Natureza: 'RENDA COMPLEMENTAR', 'Descrição Conta': 'BONIFICAÇÃO', class: 'RECEITA', desc_extrato: 'BONUS, PREMIACAO' },
	{ Conta: 21012, Tipo: 'VARIÁVEL', Natureza: 'RENDA COMPLEMENTAR', 'Descrição Conta': 'PPR', class: 'RECEITA', desc_extrato: 'PARTICIPACAO LUCROS, PPR' },
	{ Conta: 21013, Tipo: 'VARIÁVEL', Natureza: 'INVESTIMENTOS', 'Descrição Conta': 'DIVIDENDOS', class: 'RECEITA', desc_extrato: 'DIVIDENDOS, RENDIMENTO' },
	{ Conta: 21014, Tipo: 'VARIÁVEL', Natureza: 'EVENTUAL', 'Descrição Conta': 'RECEBIMENTOS EXTRAS', class: 'RECEITA', desc_extrato: 'RECEBIMENTO PIX, SALDO_INICIAL' }
];

// Template mensal base extraído do seu matriz_despesas_receita_budget.csv
const BASE_MONTHLY_BUDGET_TEMPLATE = [
	{ day: '01', cod_conta: 10015, desc_conta: 'FINANCIAMENTO', valor_budget: 757.09, tipo: 'FIXO' },
	{ day: '10', cod_conta: 10011, desc_conta: 'CONDOMÍNIO', valor_budget: 438.55, tipo: 'FIXO' },
	{ day: '10', cod_conta: 10013, desc_conta: 'INTERNET', valor_budget: 106.64, tipo: 'FIXO' },
	{ day: '10', cod_conta: 20012, desc_conta: 'ADTO. SALARIO', valor_budget: 2467.11, tipo: 'FIXO' },
	{ day: '15', cod_conta: 10017, desc_conta: 'IPTU', valor_budget: 185.00, tipo: 'FIXO' },
	{ day: '20', cod_conta: 10025, desc_conta: 'VAN ESCOLAR', valor_budget: -340.00, tipo: 'FIXO' },
	{ day: '20', cod_conta: 10041, desc_conta: 'MENSALIDADE', valor_budget: -909.88, tipo: 'FIXO' },
	{ day: '25', cod_conta: 10016, desc_conta: 'LINHA CELULAR', valor_budget: -140.00, tipo: 'FIXO' },
	{ day: '25', cod_conta: 10018, desc_conta: 'SEGURO CASA', valor_budget: -54.42, tipo: 'FIXO' },
	{ day: '25', cod_conta: 10021, desc_conta: 'COMBUSTÍVEL', valor_budget: 702.95, tipo: 'FIXO' },
	{ day: '25', cod_conta: 10024, desc_conta: 'FINANCIAMENTO', valor_budget: -1747.11, tipo: 'FIXO' },
	{ day: '25', cod_conta: 10031, desc_conta: 'FARMÁCIA', valor_budget: 163.17, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 10034, desc_conta: 'SEGURO VIDA', valor_budget: -57.83, tipo: 'FIXO' },
	{ day: '25', cod_conta: 10043, desc_conta: 'EDUCAÇÃO INFANTIL', valor_budget: -880.00, tipo: 'FIXO' },
	{ day: '25', cod_conta: 11028, desc_conta: 'ALOCAÇÕES', valor_budget: -55.00, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11031, desc_conta: 'ROUPAS', valor_budget: 718.51, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11033, desc_conta: 'DESPESAS DIVERSAS', valor_budget: -50.00, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11034, desc_conta: 'ESTÉTICA', valor_budget: 118.73, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11041, desc_conta: 'CINEMA', valor_budget: 84.72, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11051, desc_conta: 'MERCADO', valor_budget: -100.00, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11052, desc_conta: 'LANCHES', valor_budget: -250.00, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11061, desc_conta: 'CARTÃO DE CRÉDITO', valor_budget: -1500.00, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 11066, desc_conta: 'PAGAMENTOS EXTRAS', valor_budget: -100.00, tipo: 'VARIÁVEL' },
	{ day: '25', cod_conta: 20011, desc_conta: 'SALÁRIO', valor_budget: 4241.11, tipo: 'FIXO' },
	{ day: '25', cod_conta: 20013, desc_conta: 'VALE / AUXÍLIO', valor_budget: 4457.46, tipo: 'FIXO' },
	{ day: '25', cod_conta: 21014, desc_conta: 'RECEBIMENTOS EXTRAS', valor_budget: 4645.91, tipo: 'VARIÁVEL' },
	{ day: '27', cod_conta: 10012, desc_conta: 'ENERGIA', valor_budget: 642.43, tipo: 'FIXO' }
];

// Gera semente multi-mês (2025-01 a 2026-12) para fallback imediato antes do sync
function buildSeedBudget() {
	const rows = [];
	for (let year of [2025, 2026]) {
		for (let m = 1; m <= 12; m++) {
			const ym = `${year}-${String(m).padStart(2, '0')}`;
			BASE_MONTHLY_BUDGET_TEMPLATE.forEach(item => {
				rows.push({
					dt_venc: `${ym}-${item.day}`,
					cod_conta: item.cod_conta,
					desc_conta: item.desc_conta,
					valor_budget: item.valor_budget,
					tipo: item.tipo,
					obs_budget: ''
				});
			});
		}
	}
	return rows;
}

const SEED_EXTRATO = [
	{ id_transacao: 'tx_1', cod_conta: 10015, dta_transacao: '2026-11-01', desc_documento: '00360305000104 GCI CAIXA FINANCIAMENTO', tpo_transacao: 'DEBITO', vlr_transacao: -757.09 },
	{ id_transacao: 'tx_2', cod_conta: 10011, dta_transacao: '2026-11-10', desc_documento: '05489384000171 BRCONDOMINIO', tpo_transacao: 'DEBITO', vlr_transacao: -438.55 },
	{ id_transacao: 'tx_3', cod_conta: 20012, dta_transacao: '2026-11-10', desc_documento: 'ADIANTAMENTO SALARIAL SICREDI', tpo_transacao: 'CREDITO', vlr_transacao: 2467.11 },
	{ id_transacao: 'tx_4', cod_conta: 11051, dta_transacao: '2026-11-11', desc_documento: 'COMPRA DEBITO MASTER ZAFFARI', tpo_transacao: 'DEBITO', vlr_transacao: -284.90 },
	{ id_transacao: 'tx_5', cod_conta: 10021, dta_transacao: '2026-11-11', desc_documento: 'COMPRA DEBITO POSTO IPIRANGA', tpo_transacao: 'DEBITO', vlr_transacao: -240.00 }
];

const SEED_CARTOES = [
	{ id_lancamento: 'cc_1', dta_compra: '2026-11-03', fatura_mes: '2026-11', banco_cartao: 'SICREDI', final_cartao: '4821', descricao_compra: 'SUPERMERCADO ZAFFARI BOURBON', parcela: '1/1', cod_conta: 11051, desc_conta: 'MERCADO', natureza: 'ALIMENTAÇÃO', vlr_compra: 465.80 },
	{ id_lancamento: 'cc_2', dta_compra: '2026-11-05', fatura_mes: '2026-11', banco_cartao: 'NUBANK', final_cartao: '9104', descricao_compra: 'AMAZON PRIME ELETRONICOS', parcela: '2/6', cod_conta: 11021, desc_conta: 'ELETRÔNICOS', natureza: 'CASA', vlr_compra: 289.90 },
	{ id_lancamento: 'cc_3', dta_compra: '2026-11-07', fatura_mes: '2026-11', banco_cartao: 'SICREDI', final_cartao: '4821', descricao_compra: 'FARMACIA PANVEL ESTANCIA VELHA', parcela: '1/1', cod_conta: 10031, desc_conta: 'FARMÁCIA', natureza: 'SAÚDE', vlr_compra: 142.50 },
	{ id_lancamento: 'cc_4', dta_compra: '2026-11-08', fatura_mes: '2026-11', banco_cartao: 'ITAU', final_cartao: '3310', descricao_compra: 'LOJAS RENNER ROUPAS INFANTIS', parcela: '1/3', cod_conta: 11031, desc_conta: 'ROUPAS', natureza: 'CONSUMO', vlr_compra: 310.00 },
	{ id_lancamento: 'cc_5', dta_compra: '2026-11-10', fatura_mes: '2026-11', banco_cartao: 'XP', final_cartao: '7720', descricao_compra: 'IFOOD RESTAURANTES FIM DE SEMANA', parcela: '1/1', cod_conta: 11052, desc_conta: 'LANCHES', natureza: 'ALIMENTAÇÃO', vlr_compra: 178.40 }
];

// ============================================================================
// 2. ESTADO GLOBAL DA APLICAÇÃO
// ============================================================================
const AppState = {
	gasUrl: localStorage.getItem('fm_gas_url') || DEFAULT_GAS_URL,
	geminiKey: localStorage.getItem('fm_gemini_key') || '',
	timeframe: 'month', // 'week' | 'month' | 'quarter' | 'year'
	baseMonth: '2026-11',
	selectedWeek: 'ALL',
	aiWindow: 'month',
	projectionHorizon: 6,
	matriz: JSON.parse(localStorage.getItem('fm_matriz')) || SEED_MATRIZ,
	budget: JSON.parse(localStorage.getItem('fm_budget')) || buildSeedBudget(),
	extrato: JSON.parse(localStorage.getItem('fm_extrato')) || SEED_EXTRATO,
	cartoes: JSON.parse(localStorage.getItem('fm_cartoes')) || SEED_CARTOES,
	paidMap: JSON.parse(localStorage.getItem('fm_paid_map')) || {}, // { '2026-11_10011': true }
	charts: {
		bar: null,
		pie: null,
		cards: null,
		projection: null
	}
};

// ============================================================================
// 3. FUNÇÕES UTILITÁRIAS E NORMALIZAÇÃO
// ============================================================================
function formatBRL(value) {
	const num = Number(value) || 0;
	return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function normalizeDateStr(raw) {
	if (!raw) return '';
	const str = String(raw).trim();
	if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);
	if (/^\d{2}\/\d{2}\/\d{4}/.test(str)) {
		const [d, m, y] = str.split('/');
		return `${y}-${m}-${d}`;
	}
	const dt = new Date(str);
	if (!isNaN(dt.getTime())) {
		return dt.toISOString().slice(0, 10);
	}
	return str.slice(0, 10);
}

function getMatrizMap() {
	const map = new Map();
	AppState.matriz.forEach(m => {
		const code = Number(m.Conta);
		map.set(code, {
			Conta: code,
			Tipo: String(m.Tipo || 'FIXO').toUpperCase(),
			Natureza: String(m.Natureza || 'OUTROS').toUpperCase(),
			desc_conta: String(m['Descrição Conta'] || m.desc_conta || `CONTA ${code}`).toUpperCase(),
			class: String(m.class || (code >= 20000 ? 'RECEITA' : 'DESPESA')).toUpperCase(),
			desc_extrato: String(m.desc_extrato || '')
		});
	});
	return map;
}

/**
 * Classifica automaticamente uma transação de extrato com base em desc_extrato da MATRIZ
 */
function classifyExtratoRow(tx, matrizMap) {
	let code = Number(tx.cod_conta || 0);
	if (code && matrizMap.has(code)) return code;

	const docDesc = String(tx.desc_documento || '').toUpperCase();
	for (const [mCode, mObj] of matrizMap.entries()) {
		if (!mObj.desc_extrato) continue;
		const terms = mObj.desc_extrato.split(',').map(t => t.trim().toUpperCase()).filter(Boolean);
		if (terms.some(term => docDesc.includes(term))) {
			return mCode;
		}
	}
	return Number(tx.vlr_transacao) >= 0 ? 21014 : 11066;
}

function getWeekOfMonth(dateStr) {
	const day = Number(dateStr.slice(8, 10)) || 1;
	return Math.min(5, Math.ceil(day / 7));
}

function isDateInTimeframe(dateStr, timeframe, baseMonth, selectedWeek = 'ALL') {
	const norm = normalizeDateStr(dateStr);
	if (!norm || norm.length < 7) return false;
	const [y, m] = norm.split('-').map(Number);
	const [baseY, baseM] = baseMonth.split('-').map(Number);

	if (timeframe === 'week') {
		if (y !== baseY || m !== baseM) return false;
		if (selectedWeek === 'ALL') return true;
		return getWeekOfMonth(norm) === Number(selectedWeek);
	}
	if (timeframe === 'month') {
		return y === baseY && m === baseM;
	}
	if (timeframe === 'quarter') {
		if (y !== baseY) return false;
		const qBase = Math.floor((baseM - 1) / 3);
		const qRow = Math.floor((m - 1) / 3);
		return qBase === qRow;
	}
	if (timeframe === 'year') {
		return y === baseY;
	}
	return false;
}

// ============================================================================
// 4. COMUNICAÇÃO COM O GOOGLE APPS SCRIPT (GET & POST)
// ============================================================================
async function syncFromGoogleSheets() {
	const badge = document.getElementById('syncStatusBadge');
	if (badge) badge.innerHTML = `<span class="dot" style="background:#f59e0b"></span> Sincronizando Drive...`;

	try {
		const response = await fetch(`${AppState.gasUrl}?action=getAllData&t=${Date.now()}`);
		const data = await response.json();

		if (data && data.status === 'success') {
			if (Array.isArray(data.matriz) && data.matriz.length > 0) {
				AppState.matriz = data.matriz;
				localStorage.setItem('fm_matriz', JSON.stringify(AppState.matriz));
			}
			if (Array.isArray(data.budget) && data.budget.length > 0) {
				AppState.budget = data.budget;
				localStorage.setItem('fm_budget', JSON.stringify(AppState.budget));
			}
			if (Array.isArray(data.extrato) && data.extrato.length > 0) {
				AppState.extrato = data.extrato;
				localStorage.setItem('fm_extrato', JSON.stringify(AppState.extrato));
			}
			if (Array.isArray(data.cartoes) && data.cartoes.length > 0) {
				AppState.cartoes = data.cartoes;
				localStorage.setItem('fm_cartoes', JSON.stringify(AppState.cartoes));
			}
			if (Array.isArray(data.statusPagamentos)) {
				data.statusPagamentos.forEach(st => {
					if (st.chave_conciliacao) {
						AppState.paidMap[st.chave_conciliacao] = Boolean(st.pago_manual);
					}
				});
				localStorage.setItem('fm_paid_map', JSON.stringify(AppState.paidMap));
			}
			if (badge) badge.innerHTML = `<span class="dot" style="background:#10b981"></span> Sincronizado com Drive`;
			renderAll();
		} else {
			throw new Error(data.message || 'Resposta inválida');
		}
	} catch (err) {
		console.warn('Usando cache local / semente offline:', err.message);
		if (badge) badge.innerHTML = `<span class="dot" style="background:#60a5fa"></span> Base Local Ativa`;
		renderAll();
	}
}

async function postToGoogleSheets(action, payloadData) {
	try {
		await fetch(AppState.gasUrl, {
			method: 'POST',
			mode: 'no-cors',
			headers: { 'Content-Type': 'text/plain;charset=utf-8' },
			body: JSON.stringify({ action: action, data: payloadData })
		});
	} catch (err) {
		console.warn('Erro ao enviar POST para Google Sheets:', err);
	}
}

// ============================================================================
// 5. DASHBOARD: KPIs, GRÁFICOS DINÂMICOS (SEMANA/MÊS/TRIMESTRE/ANO)
// ============================================================================
function renderDashboardKPIsAndCharts() {
	const matrizMap = getMatrizMap();
	const tf = AppState.timeframe;
	const baseMonth = AppState.baseMonth;
	const selWeek = AppState.selectedWeek;

	const windowLabels = { week: 'Semana', month: 'Mês', quarter: 'Trimestre', year: 'Ano' };
	document.querySelectorAll('.lbl-window').forEach(el => {
		el.textContent = windowLabels[tf] || 'Mês';
	});
	document.getElementById('barChartGranularityBadge').textContent = windowLabels[tf];

	let recBudget = 0, despBudget = 0, recReal = 0, despReal = 0;

	// Filtra Budget na janela ativa (usando Math.abs guiado pela classe da MATRIZ)
	const filteredBudget = AppState.budget.filter(b => isDateInTimeframe(b.dt_venc, tf, baseMonth, selWeek));
	filteredBudget.forEach(b => {
		const code = Number(b.cod_conta);
		const meta = matrizMap.get(code) || { class: code >= 20000 ? 'RECEITA' : 'DESPESA' };
		const absVal = Math.abs(Number(b.valor_budget) || 0);
		if (meta.class === 'RECEITA') recBudget += absVal;
		else despBudget += absVal;
	});

	// Filtra Extrato na janela ativa
	const filteredExtrato = AppState.extrato.filter(tx => isDateInTimeframe(tx.dta_transacao, tf, baseMonth, selWeek));
	filteredExtrato.forEach(tx => {
		const code = classifyExtratoRow(tx, matrizMap);
		const meta = matrizMap.get(code) || { class: code >= 20000 ? 'RECEITA' : 'DESPESA' };
		const absVal = Math.abs(Number(tx.vlr_transacao) || 0);
		if (meta.class === 'RECEITA' || String(tx.tpo_transacao).toUpperCase() === 'CREDITO') recReal += absVal;
		else despReal += absVal;
	});

	// Se o extrato do período futuro ainda estiver vazio, exibe Realizado e referência do Budget
	const displayRec = recReal > 0 ? recReal : recBudget;
	const displayDesp = despReal > 0 ? despReal : despBudget;
	const liquido = displayRec - displayDesp;
	const pctBudget = despBudget > 0 ? ((displayDesp / despBudget) * 100).toFixed(1) : '0.0';

	document.getElementById('kpiReceitaReal').textContent = formatBRL(displayRec);
	document.getElementById('kpiReceitaBudget').textContent = `Budget: ${formatBRL(recBudget)}`;
	document.getElementById('kpiDespesaReal').textContent = formatBRL(displayDesp);
	document.getElementById('kpiDespesaBudget').textContent = `Budget: ${formatBRL(despBudget)}`;

	const elLiq = document.getElementById('kpiResultadoLiquido');
	elLiq.textContent = formatBRL(liquido);
	elLiq.style.color = liquido >= 0 ? 'var(--color-positive)' : 'var(--color-negative)';
	document.getElementById('kpiExecucaoBudget').textContent = `${pctBudget}% do Budget Desp.`;

	renderDynamicBarChart(matrizMap, tf, baseMonth);
	renderDynamicPieChart(matrizMap, filteredBudget, filteredExtrato);
	renderAnalyticPanel(matrizMap, filteredBudget, filteredExtrato);
}

/**
 * Altera dinamicamente o Eixo X do Gráfico de Barras conforme Semana, Mês, Trimestre ou Ano
 */
function renderDynamicBarChart(matrizMap, tf, baseMonth) {
	const [baseY, baseM] = baseMonth.split('-').map(Number);
	let buckets = []; // [{ key, label, recBudget, despBudget, despExtrato }]

	if (tf === 'week') {
		document.getElementById('barChartSubtitle').textContent = `Eixo Semanal (${baseMonth}) - Semanas 1 a 5`;
		for (let w = 1; w <= 5; w++) {
			buckets.push({ key: String(w), label: `Sem ${w}`, recB: 0, despB: 0, despE: 0 });
		}
		AppState.budget.forEach(b => {
			const d = normalizeDateStr(b.dt_venc);
			if (d.slice(0, 7) === baseMonth) {
				const w = getWeekOfMonth(d) - 1;
				const meta = matrizMap.get(Number(b.cod_conta));
				const val = Math.abs(Number(b.valor_budget) || 0);
				if (meta && meta.class === 'RECEITA') buckets[w].recB += val;
				else buckets[w].despB += val;
			}
		});
		AppState.extrato.forEach(tx => {
			const d = normalizeDateStr(tx.dta_transacao);
			if (d.slice(0, 7) === baseMonth) {
				const w = getWeekOfMonth(d) - 1;
				if (Number(tx.vlr_transacao) < 0 || tx.tpo_transacao === 'DEBITO') {
					buckets[w].despE += Math.abs(Number(tx.vlr_transacao) || 0);
				}
			}
		});
	} else if (tf === 'month') {
		document.getElementById('barChartSubtitle').textContent = `Eixo por Datas de Vencimento no Mês (${baseMonth})`;
		const daysSet = new Set(['01', '10', '15', '20', '25', '27', '30']);
		AppState.budget.forEach(b => {
			const d = normalizeDateStr(b.dt_venc);
			if (d.slice(0, 7) === baseMonth) daysSet.add(d.slice(8, 10));
		});
		const sortedDays = Array.from(daysSet).sort();
		buckets = sortedDays.map(day => ({ key: day, label: `Dia ${day}`, recB: 0, despB: 0, despE: 0 }));
		const bMap = new Map(buckets.map(b => [b.key, b]));

		AppState.budget.forEach(b => {
			const d = normalizeDateStr(b.dt_venc);
			if (d.slice(0, 7) === baseMonth) {
				const day = d.slice(8, 10);
				const bucket = bMap.get(day);
				if (!bucket) return;
				const meta = matrizMap.get(Number(b.cod_conta));
				const val = Math.abs(Number(b.valor_budget) || 0);
				if (meta && meta.class === 'RECEITA') bucket.recB += val;
				else bucket.despB += val;
			}
		});
		AppState.extrato.forEach(tx => {
			const d = normalizeDateStr(tx.dta_transacao);
			if (d.slice(0, 7) === baseMonth) {
				const dayNum = Number(d.slice(8, 10));
				// Aloca no vencimento mais próximo para visualização limpa
				let closest = buckets[0];
				buckets.forEach(bk => {
					if (Math.abs(Number(bk.key) - dayNum) < Math.abs(Number(closest.key) - dayNum)) closest = bk;
				});
				if (closest && (Number(tx.vlr_transacao) < 0 || tx.tpo_transacao === 'DEBITO')) {
					closest.despE += Math.abs(Number(tx.vlr_transacao) || 0);
				}
			}
		});
	} else if (tf === 'quarter') {
		const qStart = Math.floor((baseM - 1) / 3) * 3 + 1;
		const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
		document.getElementById('barChartSubtitle').textContent = `Eixo Trimestral (${baseY} - T${Math.floor((baseM - 1) / 3) + 1})`;
		for (let m = qStart; m < qStart + 3; m++) {
			const ym = `${baseY}-${String(m).padStart(2, '0')}`;
			buckets.push({ key: ym, label: `${monthNames[m - 1]}/${String(baseY).slice(2)}`, recB: 0, despB: 0, despE: 0 });
		}
		populateYearMonthBuckets(buckets, matrizMap);
	} else if (tf === 'year') {
		const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
		document.getElementById('barChartSubtitle').textContent = `Eixo Anual (${baseY} - 12 Meses)`;
		for (let m = 1; m <= 12; m++) {
			const ym = `${baseY}-${String(m).padStart(2, '0')}`;
			buckets.push({ key: ym, label: monthNames[m - 1], recB: 0, despB: 0, despE: 0 });
		}
		populateYearMonthBuckets(buckets, matrizMap);
	}

	const ctx = document.getElementById('cashflowBarChart').getContext('2d');
	if (AppState.charts.bar) AppState.charts.bar.destroy();

	AppState.charts.bar = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: buckets.map(b => b.label),
			datasets: [
				{
					label: 'Receita (Budget)',
					data: buckets.map(b => Number(b.recB.toFixed(2))),
					backgroundColor: 'rgba(16, 185, 129, 0.78)',
					borderRadius: 5
				},
				{
					label: 'Despesa (Budget)',
					data: buckets.map(b => Number(b.despB.toFixed(2))),
					backgroundColor: 'rgba(239, 68, 68, 0.78)',
					borderRadius: 5
				},
				{
					label: 'Despesa (Extrato)',
					data: buckets.map(b => Number(b.despE.toFixed(2))),
					backgroundColor: 'rgba(59, 130, 246, 0.85)',
					borderRadius: 5
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { labels: { color: '#cbd5e1', font: { size: 10 } } }
			},
			scales: {
				x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { display: false } },
				y: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.1)' } }
			}
		}
	});
}

function populateYearMonthBuckets(buckets, matrizMap) {
	const bMap = new Map(buckets.map(b => [b.key, b]));
	AppState.budget.forEach(b => {
		const ym = normalizeDateStr(b.dt_venc).slice(0, 7);
		const bucket = bMap.get(ym);
		if (!bucket) return;
		const meta = matrizMap.get(Number(b.cod_conta));
		const val = Math.abs(Number(b.valor_budget) || 0);
		if (meta && meta.class === 'RECEITA') bucket.recB += val;
		else bucket.despB += val;
	});
	AppState.extrato.forEach(tx => {
		const ym = normalizeDateStr(tx.dta_transacao).slice(0, 7);
		const bucket = bMap.get(ym);
		if (!bucket) return;
		if (Number(tx.vlr_transacao) < 0 || tx.tpo_transacao === 'DEBITO') {
			bucket.despE += Math.abs(Number(tx.vlr_transacao) || 0);
		}
	});
}

/**
 * Altera a proporção do Gráfico de Rosca conforme a janela selecionada
 */
function renderDynamicPieChart(matrizMap, filteredBudget, filteredExtrato) {
	const sourceMode = document.getElementById('pieSourceSelect').value;
	const totalsByNatureza = {};

	if (sourceMode === 'DESPESA_EXTRATO' && filteredExtrato.length > 0) {
		filteredExtrato.forEach(tx => {
			const code = classifyExtratoRow(tx, matrizMap);
			const meta = matrizMap.get(code) || { Natureza: 'OUTROS', class: 'DESPESA' };
			if (meta.class !== 'DESPESA') return;
			const val = Math.abs(Number(tx.vlr_transacao) || 0);
			totalsByNatureza[meta.Natureza] = (totalsByNatureza[meta.Natureza] || 0) + val;
		});
	} else {
		const targetClass = sourceMode === 'RECEITA_BUDGET' ? 'RECEITA' : 'DESPESA';
		filteredBudget.forEach(b => {
			const code = Number(b.cod_conta);
			const meta = matrizMap.get(code) || { Natureza: 'OUTROS', class: code >= 20000 ? 'RECEITA' : 'DESPESA' };
			if (meta.class !== targetClass) return;
			const val = Math.abs(Number(b.valor_budget) || 0);
			if (val > 0) {
				totalsByNatureza[meta.Natureza] = (totalsByNatureza[meta.Natureza] || 0) + val;
			}
		});
	}

	const entries = Object.entries(totalsByNatureza).sort((a, b) => b[1] - a[1]);
	const totalSum = entries.reduce((acc, e) => acc + e[1], 0) || 1;
	const labels = entries.map(([nat, val]) => `${nat} (${((val / totalSum) * 100).toFixed(1)}%)`);
	const values = entries.map(([, val]) => Number(val.toFixed(2)));

	const palette = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#8b5cf6', '#64748b'];
	const ctx = document.getElementById('naturezaPieChart').getContext('2d');
	if (AppState.charts.pie) AppState.charts.pie.destroy();

	AppState.charts.pie = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: labels,
			datasets: [{
				data: values,
				backgroundColor: palette.slice(0, labels.length),
				borderWidth: 1,
				borderColor: '#0b101e'
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			cutout: '62%',
			plugins: {
				legend: {
					position: 'right',
					labels: { color: '#cbd5e1', font: { size: 10 }, boxWidth: 10 }
				}
			}
		}
	});
}

// ============================================================================
// 6. NOVA VISÃO: CRONOGRAMA DE VENCIMENTOS, CONCILIAÇÃO E SIMULADOR
// ============================================================================
function renderDueScheduleView() {
	const matrizMap = getMatrizMap();
	const dueMonth = document.getElementById('dueMonthFilter').value || AppState.baseMonth;
	const dueDayFilter = document.getElementById('dueDayFilter').value;
	const dueStatusFilter = document.getElementById('dueStatusFilter').value;

	// Data atual para cálculo de status (Próximo do vencimento vs Em atraso)
	const todayStr = new Date().toISOString().slice(0, 10);
	const todayTime = new Date(todayStr + 'T00:00:00').getTime();

	// Mapeia pagamentos realizados no Extrato no mês selecionado por cod_conta
	const extratoPaidByAccount = new Map();
	AppState.extrato.forEach(tx => {
		const d = normalizeDateStr(tx.dta_transacao);
		if (d.slice(0, 7) === dueMonth) {
			const code = classifyExtratoRow(tx, matrizMap);
			const absVal = Math.abs(Number(tx.vlr_transacao) || 0);
			extratoPaidByAccount.set(code, (extratoPaidByAccount.get(code) || 0) + absVal);
		}
	});

	// Filtra as contas de DESPESA do budget para o mês selecionado (com valor > 0)
	const monthBudgetItems = AppState.budget
		.filter(b => {
			const d = normalizeDateStr(b.dt_venc);
			if (d.slice(0, 7) !== dueMonth) return false;
			const code = Number(b.cod_conta);
			const meta = matrizMap.get(code) || { class: code >= 20000 ? 'RECEITA' : 'DESPESA' };
			const absVal = Math.abs(Number(b.valor_budget) || 0);
			return meta.class === 'DESPESA' && absVal > 0;
		})
		.map(b => {
			const normDate = normalizeDateStr(b.dt_venc);
			const dayNum = Number(normDate.slice(8, 10));
			const code = Number(b.cod_conta);
			const meta = matrizMap.get(code) || { Natureza: 'OUTROS', desc_conta: b.desc_conta };
			const absBudget = Math.abs(Number(b.valor_budget) || 0);
			const chave = `${dueMonth}_${code}_${String(dayNum).padStart(2, '0')}`;

			const paidInExtrato = extratoPaidByAccount.get(code) || 0;
			const autoConciliated = paidInExtrato > 0;
			const manualPaid = Boolean(AppState.paidMap[chave]);
			const isPaid = manualPaid || autoConciliated;

			const dueTime = new Date(normDate + 'T00:00:00').getTime();
			const diffDays = Math.round((dueTime - todayTime) / (1000 * 60 * 60 * 24));

			let statusKey = 'ONTIME';
			let statusLabel = 'A VENCER';
			let statusClass = 'chip-ontime';

			if (isPaid) {
				statusKey = 'PAID';
				statusLabel = autoConciliated && !manualPaid ? 'CONTA PAGA (CONCILIADO EXTRATO)' : 'CONTA PAGA (EM DIA)';
				statusClass = 'chip-paid';
			} else if (diffDays < 0) {
				statusKey = 'OVERDUE';
				statusLabel = `EM ATRASO (${Math.abs(diffDays)}d)`;
				statusClass = 'chip-overdue';
			} else if (diffDays <= 5) {
				statusKey = 'SOON';
				statusLabel = diffDays === 0 ? 'VENCE HOJE' : `PRÓX. VENCIMENTO (${diffDays}d)`;
				statusClass = 'chip-soon';
			}

			return {
				chave,
				dt_venc: normDate,
				dayNum,
				cod_conta: code,
				desc_conta: meta.desc_conta || b.desc_conta,
				natureza: meta.Natureza,
				tipo: b.tipo || meta.Tipo,
				valor_budget: absBudget,
				paidInExtrato,
				autoConciliated,
				manualPaid,
				isPaid,
				statusKey,
				statusLabel,
				statusClass
			};
		});

	// Contadores gerais de status
	const countPaid = monthBudgetItems.filter(i => i.statusKey === 'PAID').length;
	const countOverdue = monthBudgetItems.filter(i => i.statusKey === 'OVERDUE').length;
	const countSoon = monthBudgetItems.filter(i => i.statusKey === 'SOON').length;

	document.getElementById('dueStatusSummary').innerHTML = `
    <span class="status-chip chip-paid">Pagas: ${countPaid}</span>
    <span class="status-chip chip-soon">Próx. Vencimento: ${countSoon}</span>
    <span class="status-chip chip-overdue">Em Atraso: ${countOverdue}</span>
  `;

	// Aplica filtros de Dia de Vencimento e Status
	const visibleItems = monthBudgetItems.filter(item => {
		if (dueDayFilter !== 'ALL' && item.dayNum !== Number(dueDayFilter)) return false;
		if (dueStatusFilter === 'PENDING' && item.isPaid) return false;
		if (dueStatusFilter === 'OVERDUE' && item.statusKey !== 'OVERDUE') return false;
		if (dueStatusFilter === 'SOON' && item.statusKey !== 'SOON') return false;
		if (dueStatusFilter === 'PAID' && !item.isPaid) return false;
		return true;
	});

	// Agrupa por dia de vencimento (ex: Dia 01, Dia 10, Dia 15, Dia 20, Dia 25, Dia 27)
	const groupedByDay = new Map();
	visibleItems
		.sort((a, b) => a.dayNum - b.dayNum || a.cod_conta - b.cod_conta)
		.forEach(item => {
			if (!groupedByDay.has(item.dayNum)) groupedByDay.set(item.dayNum, []);
			groupedByDay.get(item.dayNum).push(item);
		});

	const container = document.getElementById('dueGroupsContainer');
	if (groupedByDay.size === 0) {
		container.innerHTML = `<div class="ai-health-summary-box">Nenhuma conta encontrada para o filtro selecionado.</div>`;
	} else {
		let html = '';
		for (const [day, items] of groupedByDay.entries()) {
			const dayPad = String(day).padStart(2, '0');
			const subTotalDay = items.reduce((acc, i) => acc + i.valor_budget, 0);
			const subPaidDay = items.filter(i => i.isPaid).reduce((acc, i) => acc + i.valor_budget, 0);
			const subPendingDay = subTotalDay - subPaidDay;

			html += `
        <div class="due-day-group">
          <div class="due-day-header">
            <span><i data-lucide="calendar-clock" style="width:14px;height:14px;vertical-align:middle;"></i> Vencimentos Dia ${dayPad}/${dueMonth.slice(5, 7)}</span>
            <span>${items.length} conta(s)</span>
          </div>
          ${items.map(item => `
            <div class="due-item-row ${item.isPaid ? 'is-paid' : ''}">
              <div class="due-left">
                <input
                  type="checkbox"
                  class="due-checkbox"
                  data-chave="${item.chave}"
                  data-dt="${item.dt_venc}"
                  data-cod="${item.cod_conta}"
                  data-val="${item.valor_budget}"
                  ${item.isPaid ? 'checked' : ''}
                />
                <div>
                  <div class="due-info-title">
                    <span>[${item.cod_conta}] ${item.desc_conta}</span>
                    <span class="status-chip ${item.statusClass}">${item.statusLabel}</span>
                  </div>
                  <div class="due-info-sub">
                    ${item.natureza} • ${item.tipo}
                    ${item.autoConciliated ? ` • Extrato: ${formatBRL(item.paidInExtrato)}` : ''}
                  </div>
                </div>
              </div>
              <div class="due-right">
                <span class="due-amount">${formatBRL(item.valor_budget)}</span>
              </div>
            </div>
          `).join('')}
          <div class="due-day-subtotal">
            <span>Subtotal Dia ${dayPad}: <strong>${formatBRL(subTotalDay)}</strong></span>
            <span>Pago: <strong style="color:var(--color-positive)">${formatBRL(subPaidDay)}</strong> | Aberto: <strong style="color:var(--color-warning)">${formatBRL(subPendingDay)}</strong></span>
          </div>
        </div>
      `;
		}
		container.innerHTML = html;
	}

	// Calcula Total Geral das Contas exibidas
	const grandTotalAll = visibleItems.reduce((acc, i) => acc + i.valor_budget, 0);
	const grandTotalPaid = visibleItems.filter(i => i.isPaid).reduce((acc, i) => acc + i.valor_budget, 0);
	const grandTotalPending = grandTotalAll - grandTotalPaid;

	document.getElementById('dueTotalAll').textContent = formatBRL(grandTotalAll);
	document.getElementById('dueTotalPaid').textContent = formatBRL(grandTotalPaid);
	document.getElementById('dueTotalPending').textContent = formatBRL(grandTotalPending);

	// Atualiza o Simulador de Cobertura de Caixa
	updateDueSimulator(grandTotalAll, grandTotalPending);

	// Eventos dos checkboxes de baixa manual
	container.querySelectorAll('.due-checkbox').forEach(cb => {
		cb.addEventListener('change', e => {
			const chave = e.target.getAttribute('data-chave');
			const isChecked = e.target.checked;
			AppState.paidMap[chave] = isChecked;
			localStorage.setItem('fm_paid_map', JSON.stringify(AppState.paidMap));

			postToGoogleSheets('togglePaidStatus', {
				chave_conciliacao: chave,
				ano_mes: dueMonth,
				dt_venc: e.target.getAttribute('data-dt'),
				cod_conta: Number(e.target.getAttribute('data-cod')),
				pago_manual: isChecked,
				valor_pago: Number(e.target.getAttribute('data-val'))
			});

			renderDueScheduleView();
		});
	});

	if (window.lucide) lucide.createIcons();
}

function updateDueSimulator(grandTotalAll, grandTotalPending) {
	const inputVal = Number(document.getElementById('simInputAmount').value) || 0;
	const mode = document.getElementById('simTargetSelect').value;
	const baseToPay = mode === 'TOTAL_PENDENTE' ? grandTotalPending : grandTotalAll;

	// Exemplo solicitado: Total a Pagar 10.000 e Campo 15.000 => Resultado +5.000 (verde se positivo, vermelho se negativo)
	const diffResult = inputVal - baseToPay;

	document.getElementById('simBaseValueDisplay').textContent = formatBRL(baseToPay);
	const resEl = document.getElementById('simResultDisplay');
	resEl.textContent = formatBRL(diffResult);
	resEl.classList.remove('positive', 'negative');
	resEl.classList.add(diffResult >= 0 ? 'positive' : 'negative');
}

// ============================================================================
// 7. PAINEL ANALÍTICO COM TAG "RECEITA" / "DESPESA" EM CADA BULLET CARD
// ============================================================================
function renderAnalyticPanel(matrizMap, filteredBudget, filteredExtrato) {
	const classFilter = document.getElementById('analyticClassFilter').value;
	const accountAgg = new Map();

	// Agrega Budget
	filteredBudget.forEach(b => {
		const code = Number(b.cod_conta);
		const meta = matrizMap.get(code) || {
			Conta: code,
			desc_conta: b.desc_conta || `CONTA ${code}`,
			Natureza: 'OUTROS',
			class: code >= 20000 ? 'RECEITA' : 'DESPESA'
		};
		if (!accountAgg.has(code)) {
			accountAgg.set(code, { ...meta, budget: 0, realizado: 0 });
		}
		accountAgg.get(code).budget += Math.abs(Number(b.valor_budget) || 0);
	});

	// Agrega Extrato
	filteredExtrato.forEach(tx => {
		const code = classifyExtratoRow(tx, matrizMap);
		const meta = matrizMap.get(code) || {
			Conta: code,
			desc_conta: `CONTA ${code}`,
			Natureza: 'OUTROS',
			class: code >= 20000 ? 'RECEITA' : 'DESPESA'
		};
		if (!accountAgg.has(code)) {
			accountAgg.set(code, { ...meta, budget: 0, realizado: 0 });
		}
		accountAgg.get(code).realizado += Math.abs(Number(tx.vlr_transacao) || 0);
	});

	const rows = Array.from(accountAgg.values())
		.filter(item => (item.budget > 0 || item.realizado > 0))
		.filter(item => classFilter === 'ALL' || item.class === classFilter)
		.sort((a, b) => Math.max(b.budget, b.realizado) - Math.max(a.budget, a.realizado));

	const container = document.getElementById('analyticBulletList');
	if (rows.length === 0) {
		container.innerHTML = `<div class="ai-health-summary-box">Sem movimentações ou budget na janela selecionada.</div>`;
		return;
	}

	container.innerHTML = rows.map(item => {
		const isReceita = item.class === 'RECEITA';
		const tagClass = isReceita ? 'tag-receita' : 'tag-despesa';
		const pct = item.budget > 0 ? (item.realizado / item.budget) * 100 : (item.realizado > 0 ? 100 : 0);
		const deltaVal = item.realizado - item.budget;
		const barColor = isReceita
			? '#10b981'
			: (pct > 100 ? '#ef4444' : pct > 85 ? '#f59e0b' : '#3b82f6');

		return `
      <div class="bullet-card">
        <div class="bullet-top">
          <div class="bullet-title-group">
            <span class="tag-class ${tagClass}">${item.class}</span>
            <strong style="font-size:0.78rem;">[${item.Conta}] ${item.desc_conta}</strong>
            <span style="font-size:0.66rem;color:var(--text-muted);">• ${item.Natureza}</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:0.72rem;font-weight:700;color:${barColor};">
            ${pct.toFixed(0)}%
          </span>
        </div>
        <div class="bullet-progress-track">
          <div class="bullet-progress-fill" style="width:${Math.min(100, pct)}%;background:${barColor};"></div>
        </div>
        <div class="bullet-metrics">
          <span>Extrato: <strong>${formatBRL(item.realizado)}</strong></span>
          <span>Budget: <strong>${formatBRL(item.budget)}</strong></span>
          <span>Δ: <strong style="color:${deltaVal > 0 && !isReceita ? 'var(--color-negative)' : 'var(--color-positive)'}">${formatBRL(deltaVal)}</strong></span>
        </div>
      </div>
    `;
	}).join('');
}

// ============================================================================
// 8. ABA 2: EXTRATO & CATÁLOGO DA MATRIZ (EDIÇÃO BIDIRECIONAL)
// ============================================================================
function renderExtratoAndMatrizTab() {
	const matrizMap = getMatrizMap();
	const query = (document.getElementById('extratoSearchInput').value || '').toUpperCase();
	const typeFilter = document.getElementById('extratoTypeFilter').value;

	const filtered = AppState.extrato
		.filter(tx => {
			if (typeFilter !== 'ALL' && String(tx.tpo_transacao).toUpperCase() !== typeFilter) return false;
			const code = classifyExtratoRow(tx, matrizMap);
			const meta = matrizMap.get(code);
			const text = `${tx.desc_documento} ${code} ${meta ? meta.desc_conta : ''} ${tx.vlr_transacao}`.toUpperCase();
			return !query || text.includes(query);
		})
		.slice(0, 80);

	const extContainer = document.getElementById('extratoListContainer');
	extContainer.innerHTML = filtered.map(tx => {
		const code = classifyExtratoRow(tx, matrizMap);
		const meta = matrizMap.get(code) || { desc_conta: 'NÃO CLASSIFICADO', Natureza: 'OUTROS', class: 'DESPESA' };
		const isCredit = Number(tx.vlr_transacao) >= 0 || tx.tpo_transacao === 'CREDITO';
		return `
      <div class="tx-row">
        <div>
          <div style="font-size:0.76rem;font-weight:600;">${tx.desc_documento}</div>
          <div style="font-size:0.66rem;color:var(--text-muted);margin-top:2px;">
            ${normalizeDateStr(tx.dta_transacao)} • <span class="tag-class ${meta.class === 'RECEITA' ? 'tag-receita' : 'tag-despesa'}">${meta.class}</span> [${code}] ${meta.desc_conta}
          </div>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.78rem;font-weight:700;color:${isCredit ? 'var(--color-positive)' : 'var(--color-negative)'}">
          ${formatBRL(tx.vlr_transacao)}
        </div>
      </div>
    `;
	}).join('');

	// Catálogo da MATRIZ clicável para edição rápida
	const matContainer = document.getElementById('matrizCatalogContainer');
	matContainer.innerHTML = AppState.matriz.map(m => `
    <div class="tx-row matriz-edit-trigger" data-code="${m.Conta}" style="cursor:pointer;">
      <div>
        <div style="font-size:0.76rem;font-weight:700;">
          <span class="tag-class ${m.class === 'RECEITA' ? 'tag-receita' : 'tag-despesa'}">${m.class}</span>
          [${m.Conta}] ${m['Descrição Conta'] || m.desc_conta}
        </div>
        <div style="font-size:0.65rem;color:var(--text-muted);margin-top:2px;">
          ${m.Natureza} (${m.Tipo}) • Termos Extrato: ${m.desc_extrato || 'Nenhum termo'}
        </div>
      </div>
      <i data-lucide="edit-3" style="width:15px;height:15px;color:var(--text-muted);"></i>
    </div>
  `).join('');

	matContainer.querySelectorAll('.matriz-edit-trigger').forEach(row => {
		row.addEventListener('click', () => {
			const code = Number(row.getAttribute('data-code'));
			const item = AppState.matriz.find(x => Number(x.Conta) === code);
			if (!item) return;
			document.getElementById('matCodigo').value = item.Conta;
			document.getElementById('matClasse').value = item.class || 'DESPESA';
			document.getElementById('matTipo').value = item.Tipo || 'FIXO';
			document.getElementById('matNatureza').value = item.Natureza || '';
			document.getElementById('matDescricao').value = item['Descrição Conta'] || item.desc_conta || '';
			document.getElementById('matDescExtrato').value = item.desc_extrato || '';
			document.getElementById('matExemplo').value = item['Exemplo de Operação'] || '';
			document.getElementById('modalMatriz').style.display = 'flex';
		});
	});

	if (window.lucide) lucide.createIcons();
}

// ============================================================================
// 9. ABA 3: CARTÕES DE CRÉDITO (POR BANCO E CATEGORIA DA MATRIZ)
// ============================================================================
function renderCartoesTab() {
	const matrizMap = getMatrizMap();
	const baseMonth = AppState.baseMonth;
	const bankFilter = document.getElementById('cardBankFilter').value;
	const catFilter = document.getElementById('cardCategoryFilter').value;

	const monthCards = AppState.cartoes.filter(c => {
		const fatura = String(c.fatura_mes || normalizeDateStr(c.dta_compra).slice(0, 7));
		if (fatura !== baseMonth) return false;
		if (bankFilter !== 'ALL' && String(c.banco_cartao).toUpperCase() !== bankFilter) return false;
		if (catFilter !== 'ALL' && Number(c.cod_conta) !== Number(catFilter)) return false;
		return true;
	});

	const totalMonthCards = monthCards.reduce((acc, c) => acc + Math.abs(Number(c.vlr_compra) || 0), 0);

	// Busca Budget da conta 11061 (CARTÃO DE CRÉDITO) no mês
	const cardBudgetItem = AppState.budget.find(b => normalizeDateStr(b.dt_venc).slice(0, 7) === baseMonth && Number(b.cod_conta) === 11061);
	const cardBudgetVal = cardBudgetItem ? Math.abs(Number(cardBudgetItem.valor_budget) || 0) : 1500;

	// Agrega por Banco e por Categoria
	const byBank = {};
	const byCat = {};
	monthCards.forEach(c => {
		const bank = String(c.banco_cartao || 'SICREDI').toUpperCase();
		const meta = matrizMap.get(Number(c.cod_conta)) || { desc_conta: c.desc_conta || 'OUTROS' };
		const val = Math.abs(Number(c.vlr_compra) || 0);
		byBank[bank] = (byBank[bank] || 0) + val;
		byCat[meta.desc_conta] = (byCat[meta.desc_conta] || 0) + val;
	});

	const topBank = Object.entries(byBank).sort((a, b) => b[1] - a[1])[0] || ['-', 0];
	const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0] || ['-', 0];

	document.getElementById('cardKpiTotal').textContent = formatBRL(totalMonthCards);
	document.getElementById('cardKpiBudgetCompare').textContent = `Budget (11061): ${formatBRL(cardBudgetVal)}`;
	document.getElementById('cardKpiTopBank').textContent = topBank[0];
	document.getElementById('cardKpiTopBankVal').textContent = formatBRL(topBank[1]);
	document.getElementById('cardKpiTopCat').textContent = topCat[0];
	document.getElementById('cardKpiTopCatVal').textContent = formatBRL(topCat[1]);

	// Gráfico de Cartões por Banco e Categoria
	const ctx = document.getElementById('cardsByBankChart').getContext('2d');
	if (AppState.charts.cards) AppState.charts.cards.destroy();

	const bankLabels = Object.keys(byBank);
	const bankValues = Object.values(byBank);

	AppState.charts.cards = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: bankLabels.length ? bankLabels : ['Sem Faturas'],
			datasets: [{
				label: `Faturas por Banco (${baseMonth})`,
				data: bankValues.length ? bankValues : [0],
				backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899'],
				borderRadius: 6
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			scales: {
				x: { ticks: { color: '#cbd5e1', font: { size: 10 } }, grid: { display: false } },
				y: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(148,163,184,0.1)' } }
			}
		}
	});

	// Lista de compras nos cartões
	const listEl = document.getElementById('cardTransactionsContainer');
	listEl.innerHTML = monthCards.map(c => {
		const meta = matrizMap.get(Number(c.cod_conta)) || { desc_conta: c.desc_conta || 'CARTÃO', Natureza: c.natureza || 'CONSUMO' };
		return `
      <div class="tx-row">
        <div>
          <div style="font-size:0.76rem;font-weight:700;">
            <span class="status-chip chip-ontime">${c.banco_cartao} ••${c.final_cartao || '0000'}</span>
            ${c.descricao_compra}
          </div>
          <div style="font-size:0.66rem;color:var(--text-muted);margin-top:3px;">
            ${c.dta_compra} • Parcela ${c.parcela || '1/1'} • [${c.cod_conta}] ${meta.desc_conta} (${meta.Natureza})
          </div>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.8rem;font-weight:700;color:var(--color-negative);">
          ${formatBRL(c.vlr_compra)}
        </div>
      </div>
    `;
	}).join('') || `<div class="ai-health-summary-box">Nenhum lançamento de cartão para o filtro selecionado.</div>`;
}

// ============================================================================
// 10. ABA 4: AI INSIGHTS (FUNÇÃO 1: SAÚDE FINANCEIRA | FUNÇÃO 2: PROJEÇÕES 6/12/24M)
// ============================================================================
function renderAIInsightsTab() {
	renderAIHealthDiagnostic();
	renderProjectionScenarioChart();
}

function renderAIHealthDiagnostic() {
	const matrizMap = getMatrizMap();
	const win = AppState.aiWindow;
	const baseMonth = AppState.baseMonth;
	const winLabels = { week: 'Semanal', month: 'Mensal', quarter: 'Trimestral', year: 'Anual' };

	const budRows = AppState.budget.filter(b => isDateInTimeframe(b.dt_venc, win, baseMonth));
	const extRows = AppState.extrato.filter(tx => isDateInTimeframe(tx.dta_transacao, win, baseMonth));
	const cardRows = AppState.cartoes.filter(c => isDateInTimeframe(c.dta_compra || (c.fatura_mes + '-10'), win, baseMonth));

	let recB = 0, despB = 0, despE = 0;
	const natureOverruns = {};

	budRows.forEach(b => {
		const meta = matrizMap.get(Number(b.cod_conta)) || { class: 'DESPESA', Natureza: 'OUTROS' };
		const val = Math.abs(Number(b.valor_budget) || 0);
		if (meta.class === 'RECEITA') recB += val;
		else {
			despB += val;
			natureOverruns[meta.Natureza] = (natureOverruns[meta.Natureza] || 0) + val;
		}
	});

	extRows.forEach(tx => {
		if (Number(tx.vlr_transacao) < 0 || tx.tpo_transacao === 'DEBITO') {
			despE += Math.abs(Number(tx.vlr_transacao) || 0);
		}
	});

	const totalCards = cardRows.reduce((acc, c) => acc + Math.abs(Number(c.vlr_compra) || 0), 0);
	const saldoProjetado = recB - despB;
	const savingsRate = recB > 0 ? ((saldoProjetado / recB) * 100).toFixed(1) : '0.0';
	const topNatureza = Object.entries(natureOverruns).sort((a, b) => b[1] - a[1])[0] || ['MORADIA', 0];

	const outEl = document.getElementById('aiHealthDiagnosticOutput');
	outEl.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <strong>Resumo de Saúde Financeira (${winLabels[win]})</strong>
      <span class="status-chip ${saldoProjetado >= 0 ? 'chip-paid' : 'chip-overdue'}">
        Margem Orçada: ${savingsRate}%
      </span>
    </div>
    <div style="font-size:0.74rem;color:var(--text-muted);">
      • Receita Prevista: <strong style="color:var(--color-positive)">${formatBRL(recB)}</strong> |
      Despesa Orçada: <strong style="color:var(--color-negative)">${formatBRL(despB)}</strong> |
      Saldo Líquido: <strong>${formatBRL(saldoProjetado)}</strong>
    </div>
    <div class="ai-action-item">
      <strong>1. Ponto de Atenção Primário (${topNatureza[0]}):</strong> Representa <strong>${formatBRL(topNatureza[1])}</strong> na janela ${winLabels[win].toLowerCase()}. Priorize conciliar os vencimentos dos dias 20 e 25, onde se concentra o maior volume de saídas fixas.
    </div>
    <div class="ai-action-item">
      <strong>2. Desagregação dos Cartões de Crédito:</strong> Os cartões acumulam <strong>${formatBRL(totalCards)}</strong> na janela selecionada. Para manter a conta <code>11061</code> dentro do teto do budget, limite novas compras parceladas nas naturezas Consumo e Lazer.
    </div>
    <div class="ai-action-item">
      <strong>3. Ação Prática de Conversão:</strong> Direcione pelo menos <strong>${formatBRL(Math.max(0, saldoProjetado * 0.6))}</strong> do superávit orçado no dia 25 (após recebimento de Salário + Vale) para reserva/aplicação (conta <code>11064</code>) antes da virada do mês.
    </div>
  `;
}

/**
 * FUNÇÃO 2: Projeções Gráficas para 6, 12 e 24 Meses com Simulador de Tomada de Decisão
 */
function renderProjectionScenarioChart() {
	const matrizMap = getMatrizMap();
	const horizon = Number(AppState.projectionHorizon) || 6;
	const [startY, startM] = AppState.baseMonth.split('-').map(Number);

	const extraMonthly = Number(document.getElementById('projMonthlyImpact').value) || 0;
	const initialOutlay = Number(document.getElementById('projInitialOutlay').value) || 0;
	const assetDesc = document.getElementById('projNewAssetDesc').value || 'Decisão Simulada';

	const labels = [];
	const recSeries = [];
	const despSeries = [];
	const acumSeries = [];

	let cumulativeCash = -initialOutlay;
	let pressuredMonths = [];

	// Calcula médias mensais de fallback do budget caso o horizonte (ex: 24m) ultrapasse 2026-12
	const fallbackRec = 15811.59;
	const fallbackDesp = 9917.01;

	for (let i = 0; i < horizon; i++) {
		const dt = new Date(startY, startM - 1 + i, 1);
		const y = dt.getFullYear();
		const m = dt.getMonth() + 1;
		const ym = `${y}-${String(m).padStart(2, '0')}`;
		labels.push(`${String(m).padStart(2, '0')}/${String(y).slice(2)}`);

		const monthRows = AppState.budget.filter(b => normalizeDateStr(b.dt_venc).slice(0, 7) === ym);
		let mRec = 0, mDesp = 0;

		if (monthRows.length > 0) {
			monthRows.forEach(b => {
				const meta = matrizMap.get(Number(b.cod_conta)) || { class: Number(b.cod_conta) >= 20000 ? 'RECEITA' : 'DESPESA' };
				const val = Math.abs(Number(b.valor_budget) || 0);
				if (meta.class === 'RECEITA') mRec += val;
				else mDesp += val;
			});
		} else {
			mRec = fallbackRec;
			mDesp = fallbackDesp;
		}

		const totalDespWithSim = mDesp + extraMonthly;
		const netMonth = mRec - totalDespWithSim;
		cumulativeCash += netMonth;

		if (netMonth < 0) pressuredMonths.push(labels[labels.length - 1]);

		recSeries.push(Number(mRec.toFixed(2)));
		despSeries.push(Number(totalDespWithSim.toFixed(2)));
		acumSeries.push(Number(cumulativeCash.toFixed(2)));
	}

	const ctx = document.getElementById('projectionForecastChart').getContext('2d');
	if (AppState.charts.projection) AppState.charts.projection.destroy();

	AppState.charts.projection = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Caixa Acumulado Projetado',
					data: acumSeries,
					borderColor: '#3b82f6',
					backgroundColor: 'rgba(59, 130, 246, 0.15)',
					fill: true,
					tension: 0.3,
					borderWidth: 2.5
				},
				{
					label: 'Receita Orçada',
					data: recSeries,
					borderColor: '#10b981',
					borderDash: [4, 4],
					tension: 0.25,
					borderWidth: 1.8
				},
				{
					label: 'Despesa + Simulação',
					data: despSeries,
					borderColor: '#ef4444',
					tension: 0.25,
					borderWidth: 1.8
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { labels: { color: '#cbd5e1', font: { size: 10 } } }
			},
			scales: {
				x: { ticks: { color: '#94a3b8', font: { size: 9 } }, grid: { display: false } },
				y: { ticks: { color: '#94a3b8', font: { size: 9 } }, grid: { color: 'rgba(148,163,184,0.1)' } }
			}
		}
	});

	const finalBalance = acumSeries[acumSeries.length - 1] || 0;
	const avgMonthlyNet = (finalBalance + initialOutlay) / horizon;
	const verdictEl = document.getElementById('projectionVerdictBox');

	verdictEl.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <strong>Parecer de Tomada de Decisão (${horizon} Meses)</strong>
      <span class="status-chip ${finalBalance >= 0 ? 'chip-paid' : 'chip-overdue'}">
        Acumulado Final: ${formatBRL(finalBalance)}
      </span>
    </div>
    <div style="font-size:0.74rem;color:var(--text-muted);">
      • Geração Média Mensal de Caixa: <strong style="color:${avgMonthlyNet >= 0 ? 'var(--color-positive)' : 'var(--color-negative)'}">${formatBRL(avgMonthlyNet)}/mês</strong>
      ${extraMonthly > 0 || initialOutlay > 0 ? `<br>• Cenário Simulado (${assetDesc}): Entrada de ${formatBRL(initialOutlay)} + Parcela de ${formatBRL(extraMonthly)}/mês.` : ''}
    </div>
    <div class="ai-action-item">
      ${pressuredMonths.length === 0
			? `<strong>Viabilidade Positiva:</strong> Nenhum mês apresenta déficit operacional nos próximos ${horizon} meses. A estrutura do budget comporta a operação mantendo folga de liquidez.`
			: `<strong>Atenção aos Meses Pressionados (${pressuredMonths.join(', ')}):</strong> Nesses períodos a despesa projetada supera a receita do mês. Recomenda-se provisionar reserva prévia ou postergar novas aquisições.`
		}
    </div>
  `;
}

// ============================================================================
// 11. POPULAÇÃO DE SELECTS, EVENTOS E INICIALIZAÇÃO
// ============================================================================
function populateAccountSelects() {
	const optionsHtml = AppState.matriz
		.sort((a, b) => Number(a.Conta) - Number(b.Conta))
		.map(m => `<option value="${m.Conta}">[${m.Conta}] ${m['Descrição Conta'] || m.desc_conta} (${m.class})</option>`)
		.join('');

	const budSelect = document.getElementById('budCodConta');
	if (budSelect) budSelect.innerHTML = optionsHtml;

	const cardModalSelect = document.getElementById('cardCodContaInput');
	if (cardModalSelect) cardModalSelect.innerHTML = optionsHtml;

	const cardFilterSelect = document.getElementById('cardCategoryFilter');
	if (cardFilterSelect) {
		cardFilterSelect.innerHTML = `<option value="ALL">Todas as Categorias</option>` + optionsHtml;
	}
}

function renderAll() {
	populateAccountSelects();
	renderDashboardKPIsAndCharts();
	renderDueScheduleView();
	renderExtratoAndMatrizTab();
	renderCartoesTab();
	renderAIInsightsTab();
	if (window.lucide) lucide.createIcons();
}

function setupEventListeners() {
	// Navegação entre abas
	document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
		btn.addEventListener('click', () => {
			document.querySelectorAll('.bottom-nav .nav-item').forEach(b => b.classList.remove('active'));
			document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
			btn.classList.add('active');
			const targetId = btn.getAttribute('data-target');
			document.getElementById(targetId).classList.add('active');
			renderAll();
		});
	});

	// Seletores de janela de tempo (Semana, Mês, Trimestre, Ano)
	document.querySelectorAll('#timeframeFilterGroup .seg-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			document.querySelectorAll('#timeframeFilterGroup .seg-btn').forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			AppState.timeframe = btn.getAttribute('data-timeframe');
			document.getElementById('weekSelectorWrapper').style.display = AppState.timeframe === 'week' ? 'flex' : 'none';
			renderDashboardKPIsAndCharts();
		});
	});

	// Seletor de Mês Global
	document.getElementById('globalMonthInput').addEventListener('change', e => {
		AppState.baseMonth = e.target.value;
		document.getElementById('dueMonthFilter').value = e.target.value;
		renderAll();
	});

	document.getElementById('globalWeekSelect').addEventListener('change', e => {
		AppState.selectedWeek = e.target.value;
		renderDashboardKPIsAndCharts();
	});

	// Filtros de Pizza e Painel Analítico
	document.getElementById('pieSourceSelect').addEventListener('change', () => renderDashboardKPIsAndCharts());
	document.getElementById('analyticClassFilter').addEventListener('change', () => renderDashboardKPIsAndCharts());

	// Filtros do Cronograma de Vencimentos e Simulador
	['dueMonthFilter', 'dueDayFilter', 'dueStatusFilter'].forEach(id => {
		document.getElementById(id).addEventListener('change', () => renderDueScheduleView());
	});
	document.getElementById('simInputAmount').addEventListener('input', () => renderDueScheduleView());
	document.getElementById('simTargetSelect').addEventListener('change', () => renderDueScheduleView());

	// Filtros de Extrato e Cartões
	document.getElementById('extratoSearchInput').addEventListener('input', () => renderExtratoAndMatrizTab());
	document.getElementById('extratoTypeFilter').addEventListener('change', () => renderExtratoAndMatrizTab());
	document.getElementById('cardBankFilter').addEventListener('change', () => renderCartoesTab());
	document.getElementById('cardCategoryFilter').addEventListener('change', () => renderCartoesTab());

	// Controles da aba AI Insights
	document.querySelectorAll('.seg-btn-ai').forEach(btn => {
		btn.addEventListener('click', () => {
			document.querySelectorAll('.seg-btn-ai').forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			AppState.aiWindow = btn.getAttribute('data-ai-window');
			renderAIHealthDiagnostic();
		});
	});

	document.querySelectorAll('#projectionHorizonGroup .seg-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			document.querySelectorAll('#projectionHorizonGroup .seg-btn').forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			AppState.projectionHorizon = Number(btn.getAttribute('data-horizon'));
			renderProjectionScenarioChart();
		});
	});

	['projNewAssetDesc', 'projMonthlyImpact', 'projInitialOutlay'].forEach(id => {
		document.getElementById(id).addEventListener('input', () => renderProjectionScenarioChart());
	});

	// Botão Gemini IA Generativa (Função 1)
	document.getElementById('btnRunGeminiHealth').addEventListener('click', async () => {
		const outEl = document.getElementById('aiHealthDiagnosticOutput');
		if (!AppState.geminiKey) {
			outEl.insertAdjacentHTML('beforeend', `<div class="ai-action-item">Configure sua chave da API Gemini no ícone de engrenagem no topo para habilitar respostas generativas ao vivo.</div>`);
			return;
		}
		outEl.insertAdjacentHTML('beforeend', `<div class="ai-action-item" id="geminiLoadingMsg">Consultando Google Gemini...</div>`);
		try {
			const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${AppState.geminiKey}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [{
						parts: [{
							text: `Você é um consultor financeiro pessoal. Analise o período ${AppState.baseMonth} na janela ${AppState.aiWindow}. Forneça 3 recomendações objetivas em português para otimizar o orçamento e reduzir despesas variáveis e de cartão de crédito.`
						}]
					}]
				})
			});
			const json = await resp.json();
			const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || 'Análise concluída.';
			document.getElementById('geminiLoadingMsg').innerHTML = `<strong>Parecer Gemini AI:</strong><br>${text.replace(/\n/g, '<br>')}`;
		} catch (e) {
			document.getElementById('geminiLoadingMsg').textContent = 'Erro ao consultar a API Gemini.';
		}
	});

	// Abertura e Fechamento de Modais
	document.getElementById('btnNewMatrizModal').addEventListener('click', () => {
		document.getElementById('formMatrizAccount').reset();
		document.getElementById('modalMatriz').style.display = 'flex';
	});
	document.getElementById('btnOpenBudgetModal').addEventListener('click', () => {
		document.getElementById('modalBudget').style.display = 'flex';
	});
	document.getElementById('btnNewBudgetFromTab').addEventListener('click', () => {
		document.getElementById('modalBudget').style.display = 'flex';
	});
	document.getElementById('btnOpenCardModal').addEventListener('click', () => {
		document.getElementById('modalCartao').style.display = 'flex';
	});
	document.getElementById('btnOpenSettings').addEventListener('click', () => {
		document.getElementById('cfgGasUrl').value = AppState.gasUrl;
		document.getElementById('cfgGeminiKey').value = AppState.geminiKey;
		document.getElementById('modalSettings').style.display = 'flex';
	});
	document.getElementById('btnSyncDrive').addEventListener('click', () => syncFromGoogleSheets());

	document.querySelectorAll('.icon-btn-close').forEach(btn => {
		btn.addEventListener('click', () => {
			const target = btn.getAttribute('data-close');
			document.getElementById(target).style.display = 'none';
		});
	});

	// Submissão Modal 1: Salvar Conta na MATRIZ
	document.getElementById('formMatrizAccount').addEventListener('submit', e => {
		e.preventDefault();
		const newItem = {
			Conta: Number(document.getElementById('matCodigo').value),
			class: document.getElementById('matClasse').value,
			Tipo: document.getElementById('matTipo').value,
			Natureza: document.getElementById('matNatureza').value.toUpperCase(),
			'Descrição Conta': document.getElementById('matDescricao').value.toUpperCase(),
			desc_extrato: document.getElementById('matDescExtrato').value,
			'Exemplo de Operação': document.getElementById('matExemplo').value
		};

		const idx = AppState.matriz.findIndex(m => Number(m.Conta) === newItem.Conta);
		if (idx >= 0) AppState.matriz[idx] = newItem;
		else AppState.matriz.push(newItem);

		localStorage.setItem('fm_matriz', JSON.stringify(AppState.matriz));
		postToGoogleSheets('saveMatrizAccount', newItem);
		document.getElementById('modalMatriz').style.display = 'none';
		renderAll();
	});

	// Submissão Modal 2: Salvar / Ajustar Item no Budget
	document.getElementById('formBudgetItem').addEventListener('submit', e => {
		e.preventDefault();
		const codConta = Number(document.getElementById('budCodConta').value);
		const meta = getMatrizMap().get(codConta);
		const dtVenc = document.getElementById('budDtVenc').value;
		const valor = Number(document.getElementById('budValor').value);
		const tipo = document.getElementById('budTipo').value;
		const replicate = Number(document.getElementById('budReplicate').value) || 1;
		const obs = document.getElementById('budObs').value;

		for (let m = 0; m < replicate; m++) {
			const [y, mon, day] = dtVenc.split('-').map(Number);
			const dt = new Date(y, mon - 1 + m, day);
			const targetDate = dt.toISOString().slice(0, 10);
			const targetYM = targetDate.slice(0, 7);

			const existingIdx = AppState.budget.findIndex(
				b => normalizeDateStr(b.dt_venc).slice(0, 7) === targetYM && Number(b.cod_conta) === codConta
			);

			const rowObj = {
				dt_venc: targetDate,
				cod_conta: codConta,
				desc_conta: meta ? meta.desc_conta : `CONTA ${codConta}`,
				valor_budget: valor,
				tipo: tipo,
				obs_budget: obs
			};

			if (existingIdx >= 0) AppState.budget[existingIdx] = rowObj;
			else AppState.budget.push(rowObj);
		}

		localStorage.setItem('fm_budget', JSON.stringify(AppState.budget));
		postToGoogleSheets('saveBudgetItem', {
			dt_venc: dtVenc,
			cod_conta: codConta,
			desc_conta: meta ? meta.desc_conta : `CONTA ${codConta}`,
			valor_budget: valor,
			tipo: tipo,
			obs_budget: obs,
			replicate_months: replicate
		});

		document.getElementById('modalBudget').style.display = 'none';
		renderAll();
	});

	// Submissão Modal 3: Novo Lançamento de Cartão
	document.getElementById('formCartaoItem').addEventListener('submit', e => {
		e.preventDefault();
		const codConta = Number(document.getElementById('cardCodContaInput').value);
		const meta = getMatrizMap().get(codConta) || { desc_conta: 'CARTÃO', Natureza: 'CONSUMO' };

		const cardItem = {
			id_lancamento: 'cc_' + Date.now(),
			banco_cartao: document.getElementById('cardBancoInput').value,
			final_cartao: document.getElementById('cardFinalInput').value,
			dta_compra: document.getElementById('cardDataInput').value,
			fatura_mes: document.getElementById('cardFaturaInput').value,
			descricao_compra: document.getElementById('cardDescInput').value.toUpperCase(),
			cod_conta: codConta,
			desc_conta: meta.desc_conta,
			natureza: meta.Natureza,
			parcela: document.getElementById('cardParcelaInput').value,
			vlr_compra: Number(document.getElementById('cardValorInput').value)
		};

		AppState.cartoes.unshift(cardItem);
		localStorage.setItem('fm_cartoes', JSON.stringify(AppState.cartoes));
		postToGoogleSheets('saveCartaoItem', cardItem);
		document.getElementById('modalCartao').style.display = 'none';
		renderAll();
	});

	// Salvar Configurações
	document.getElementById('btnSaveSettings').addEventListener('click', () => {
		AppState.gasUrl = document.getElementById('cfgGasUrl').value.trim() || DEFAULT_GAS_URL;
		AppState.geminiKey = document.getElementById('cfgGeminiKey').value.trim();
		localStorage.setItem('fm_gas_url', AppState.gasUrl);
		localStorage.setItem('fm_gemini_key', AppState.geminiKey);
		document.getElementById('modalSettings').style.display = 'none';
		syncFromGoogleSheets();
	});
}

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', () => {
	setupEventListeners();
	renderAll();
	syncFromGoogleSheets();
});