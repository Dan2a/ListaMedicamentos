const BASE_URL = 'http://localhost:8080/medicamentos';
document.addEventListener('DOMContentLoaded', listarMedicamentos);


function listarMedicamentos() {
    fetch(`${BASE_URL}/listar`, {cache: "no-store"})
        .then(response => response.json())
        .then(medicamentos => {
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
        })
        .catch(error => console.error('Erro ao listar:', error));
}

document.getElementById('formMedicamento').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('idMedicamento').value;
    const medicamento = {
        nome: document.getElementById('nome').value,
        principioAtivo: document.getElementById('PrincipioAtivo').value,
        fabricante: document.getElementById('Fabricante').value
    };

    let url = BASE_URL + '/salvar';
    let method = 'POST';

    if (id) {
        url = `${BASE_URL}/${id}`;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicamento)
    })
    .then(response => response.json())
    .then(data => {
        fecharModal();
        then(() => {
            fecharModal();
            setTimeout(() => {
            listarMedicamentos();
        }, 300);
    alert(id ? 'Medicamento atualizado com sucesso!' : 'Medicamento salvo com sucesso!');
})
    })
    .catch(error => console.error('Erro:', error));
});

function editarMedicamento(id) {
    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(medicamento => {
            document.getElementById('idMedicamento').value = medicamento.id;
            document.getElementById('nome').value = medicamento.nome;
            document.getElementById('PrincipioAtivo').value = medicamento.principioAtivo || '';
            document.getElementById('Fabricante').value = medicamento.fabricante;

            abrirModal();
        })
        .catch(error => console.error('Erro ao buscar medicamento:', error));
}

function deletarMedicamento(id) {
    if (confirm('Tem certeza que deseja excluir este medicamento?')) {
        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            listarMedicamentos();
            alert('Medicamento excluído com sucesso!');
        })
        .catch(error => console.error('Erro ao excluir:', error));
    }
}

document.getElementById('btnPesquisarMedicamento').addEventListener('click', function() {
    const nome = document.getElementById('pesquisaMedicamento').value;

    fetch(`${BASE_URL}/filtro?nome=${encodeURIComponent(nome)}`)
        .then(response => response.json())
        .then(medicamentos => {
            const sugestoes = document.getElementById('sugestoes');
            sugestoes.innerHTML = '';
            medicamentos.forEach(m => {
                const li = document.createElement('li');
                li.textContent = `${m.nome} - ${m.fabricante}`;
                sugestoes.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao filtrar:', error));
});


function abrirModal() {
    document.getElementById("modalMedicamentoTitle").textContent = "Adicionar Medicamento";
    document.getElementById("modalMedicamento").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalMedicamento").style.display = "none";
    document.getElementById("formMedicamento").reset();
    document.getElementById("idMedicamento").value = "";


    const contatosContainer = document.getElementById("contatosContainer");
    contatosContainer.innerHTML = '';
}

window.addEventListener('click', function(event) {
    let modal = document.getElementById("modalMedicamento");
    if (event.target === modal) {
        fecharModal();
    }
});

// SIDEBAR
function abrirBar() {
    document.getElementById('sidebar').classList.add('active');
}

function fecharBar() {
    document.getElementById('sidebar').classList.remove('active');
}

// Simula medicamentos vindos de uma API ou array local
const medicamentos = [
    { nome: 'Paracetamol' },
    { nome: 'Ibuprofeno' },
    { nome: 'Dipirona' },
    { nome: 'Amoxicilina' },
    { nome: 'Cetirizina' }
];

document.getElementById('btnPesquisarSidebar').addEventListener('click', () => {
    const termo = document.getElementById('pesquisaSidebar').value.toLowerCase();
    const resultados = medicamentos.filter(m => m.nome.toLowerCase().includes(termo));
    exibirResultados(resultados);
});

function exibirResultados(lista) {
    const ul = document.getElementById('resultadosSidebar');
    ul.innerHTML = ''; // Limpa os resultados anteriores

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
        btnAdd.addEventListener('click', () => {
            alert(`Medicamento "${med.nome}" adicionado!`);
            // Aqui você pode chamar sua função para adicionar no sistema
        });

        li.appendChild(btnAdd);
        ul.appendChild(li);
    });
}
