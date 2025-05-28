package com.listaMedicamentos.medicamentos.controller;

import com.listaMedicamentos.medicamentos.entity.Medicamento;
import com.listaMedicamentos.medicamentos.repository.MedicamentoRepository;
import com.listaMedicamentos.medicamentos.service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicamentos")
public class MedicamentoController {

    @Autowired
    private MedicamentoService medicamentoService;

    @GetMapping("/listar")
    public List<Medicamento> listar(){
        return medicamentoService.listarTodos();
    }

    @PostMapping("/salvar")
    public Medicamento criar(@RequestBody Medicamento medicamento){
        return medicamentoService.salvar(medicamento);
    }

    @GetMapping("/{id}")
    public  Medicamento buscarPorId(@PathVariable Long id) {
        return  medicamentoService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public  void deletar(@PathVariable Long id){
        medicamentoService.deletar(id);
    }
}
