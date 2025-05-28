function abrirModal() {
    document.getElementById("modalMedicamentoTitle").textContent = "Adicionar Medicamento";
    document.getElementById("modalMedicamento").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalMedicamento").style.display = "none";
    document.getElementById("formCliente").reset();
    document.getElementById("idCliente").value = "";

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
