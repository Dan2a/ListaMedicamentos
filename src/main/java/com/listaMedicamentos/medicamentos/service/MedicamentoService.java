package com.listaMedicamentos.medicamentos.service;

import com.listaMedicamentos.medicamentos.entity.Medicamento;
import com.listaMedicamentos.medicamentos.repository.MedicamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    public List<Medicamento> listarTodos(){
        return medicamentoRepository.findAll();
    }

    public Medicamento salvar(Medicamento medicamento){
        return  medicamentoRepository.save(medicamento);
    }

    public Medicamento buscarPorId(Long id){
        return medicamentoRepository.findById(id).orElse(null);
    }

    public void deletar(Long id){
        medicamentoRepository.deleteById(id);
    }

    public List<Medicamento> filtrarPorNome(String nome){
        return  medicamentoRepository.findByNomeContainingIgnoreCase(nome);
    }
}
