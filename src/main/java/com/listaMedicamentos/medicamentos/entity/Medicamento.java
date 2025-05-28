package com.listaMedicamentos.medicamentos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Medicamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Nome Obrigatorio")
    private String nome;

    @NotBlank(message = "Principio Ativo Obrigatorio")
    private String principioAtivo;

    @NotBlank(message = "Fabricante Obrigatorio")
    private String fabricante;

    private LocalDate dataCadastro;

}
