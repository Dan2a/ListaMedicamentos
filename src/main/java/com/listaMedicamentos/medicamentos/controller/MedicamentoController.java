package com.listaMedicamentos.medicamentos.controller;

import com.listaMedicamentos.medicamentos.entity.Medicamento;
import com.listaMedicamentos.medicamentos.service.MedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
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

    @PutMapping
    public Medicamento atualizar(@PathVariable Long id, @RequestBody Medicamento medicamento) {
        medicamento.setId(id);
        return medicamentoService.atualizar(medicamento);
    }

    @GetMapping("/{id}")
    public  Medicamento buscarPorId(@PathVariable Long id) {
        return  medicamentoService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public  void deletar(@PathVariable Long id){
        medicamentoService.deletar(id);
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<Medicamento>> filtrarPorNome(@RequestParam String nome) {
        List<Medicamento> resultado = medicamentoService.filtrarPorNome(nome);
        return ResponseEntity.ok(resultado);
    }

}
