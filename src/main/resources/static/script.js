const BASE_URL = 'http://localhost:8080/medicamentos';

let medicamentosSimulados = [];

document.addEventListener('DOMContentLoaded', () => {
    listarMedicamentos();
    configurarEventos();
    carregarMedicamentosSimulados();
});

// Função para carregar medicamentos simulados
async function carregarMedicamentosSimulados() {
    try {
        const response = await fetch('/medicamentos_simulados.json');
        medicamentosSimulados = await response.json();
    } catch (error) {
        console.error('Erro ao carregar medicamentos simulados:', error);
    }
}

// Funções de Listagem
async function listarMedicamentos() {
    try {
        const response = await fetch(`${BASE_URL}/listar`, { cache: "no-store" });
        const medicamentos = await response.json();
        atualizarTabela(medicamentos);
    } catch (error) {
        console.error('Erro ao listar:', error);
    }
}

function atualizarTabela(medicamentos) {
    const tabela = document.getElementById('MedicamentosTabela');
    tabela.innerHTML = '';

    medicamentos.forEach((medicamento, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${medicamento.nome}</td>
            <td>${medicamento.principioAtivo || ''}</td>
            <td>${medicamento.fabricante}</td>
            <td class="acao"><button onclick="editarMedicamento(${medicamento.id})">Editar</button></td>
            <td class="acao"><button onclick="deletarMedicamento(${medicamento.id})">Excluir</button></td>
        `;
        tabela.appendChild(row);
    });
}

// CRUD Medicamentos
async function salvarMedicamento(event) {
    event.preventDefault();

    const id = document.getElementById('idMedicamento').value;
    const medicamento = obterDadosFormulario();

    const url = id ? `${BASE_URL}/${id}` : `${BASE_URL}/salvar`;
    const method = id ? 'PUT' : 'POST';

    try {
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicamento)
        });

        fecharModal();
        listarMedicamentos();
        alert(id ? 'Medicamento atualizado com sucesso!' : 'Medicamento salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar:', error);
    }
}

function obterDadosFormulario() {
    return {
        nome: document.getElementById('nome').value,
        principioAtivo: document.getElementById('PrincipioAtivo').value,
        fabricante: document.getElementById('Fabricante').value
    };
}

async function editarMedicamento(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const medicamento = await response.json();
        preencherFormulario(medicamento);
        abrirModal('Editar Medicamento');
    } catch (error) {
        console.error('Erro ao buscar medicamento:', error);
    }
}

async function deletarMedicamento(id) {
    if (!confirm('Tem certeza que deseja excluir este medicamento?')) return;

    try {
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        listarMedicamentos();
        alert('Medicamento excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir:', error);
    }
}

// Formulário & Modal
function preencherFormulario(medicamento) {
    document.getElementById('idMedicamento').value = medicamento.id;
    document.getElementById('nome').value = medicamento.nome;
    document.getElementById('PrincipioAtivo').value = medicamento.principioAtivo || '';
    document.getElementById('Fabricante').value = medicamento.fabricante;
}

function abrirModal(titulo = "Adicionar Medicamento") {
    document.getElementById("modalMedicamentoTitle").textContent = titulo;
    document.getElementById("modalMedicamento").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalMedicamento").style.display = "none";
    document.getElementById("formMedicamento").reset();
    document.getElementById("idMedicamento").value = "";

    const contatosContainer = document.getElementById("contatosContainer");
    if (contatosContainer) contatosContainer.innerHTML = '';
}

// Pesquisa
async function pesquisarMedicamentos() {
    const nome = document.getElementById('pesquisaMedicamento').value;

    try {
        const response = await fetch(`${BASE_URL}/filtro?nome=${encodeURIComponent(nome)}`);
        const medicamentos = await response.json();
        atualizarTabela(medicamentos);
    } catch (error) {
        console.error('Erro ao filtrar:', error);
    }
}

// Eventos
function configurarEventos() {
    document.getElementById('formMedicamento').addEventListener('submit', salvarMedicamento);

    document.getElementById('btnPesquisarMedicamento').addEventListener('click', pesquisarMedicamentos);
    adicionarEventoEnter('pesquisaMedicamento', pesquisarMedicamentos);

    document.getElementById('btnPesquisarSidebar').addEventListener('click', pesquisarSidebar);
    adicionarEventoEnter('pesquisaSidebar', pesquisarSidebar);

    window.addEventListener('click', function(event) {
        const modal = document.getElementById("modalMedicamento");
        if (event.target === modal) {
            fecharModal();
        }
    });
}

function adicionarEventoEnter(inputId, callback) {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                callback();
            }
        });
    }
}

// Sidebar (simulação)
function pesquisarSidebar() {
    const termo = document.getElementById('pesquisaSidebar').value.toLowerCase();
    const resultados = medicamentosSimulados.filter(m => m.nome.toLowerCase().includes(termo));
    exibirResultadosSidebar(resultados);
}

function exibirResultadosSidebar(lista) {
    const ul = document.getElementById('resultadosSidebar');
    ul.innerHTML = '';

    if (lista.length === 0) {
        ul.innerHTML = '<li>Nenhum medicamento encontrado</li>';
        return;
    }

    lista.forEach(med => {
        const li = document.createElement('li');
        li.textContent = med.nome;

        const btnAdd = document.createElement('button');
        btnAdd.textContent = '+';
        btnAdd.title = 'Adicionar Medicamento';
        btnAdd.addEventListener('click', () => adicionarMedicamentoSimulado(med));

        li.appendChild(btnAdd);
        ul.appendChild(li);
    });
}

async function adicionarMedicamentoSimulado(medicamento) {
    try {
        await fetch(`${BASE_URL}/salvar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: medicamento.nome,
                principioAtivo: medicamento.principioAtivo,
                fabricante: medicamento.fabricante
            })
        });

        alert(`"${medicamento.nome}" adicionado com sucesso!`);
        listarMedicamentos();
    } catch (error) {
        console.error('Erro ao adicionar medicamento:', error);
    }
}

// Sidebar Toggle
function abrirBar() {
    document.getElementById('sidebar').classList.add('active');
    exibirResultadosSidebar(medicamentosSimulados);
}

function fecharBar() {
    document.getElementById('sidebar').classList.remove('active');
}
