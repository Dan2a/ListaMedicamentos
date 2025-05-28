package com.listaMedicamentos.medicamentos.repository;

import com.listaMedicamentos.medicamentos.entity.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface MedicamentoRepository extends JpaRepository<Medicamento, Long>{

    List<Medicamento> findByNomeContainingIgnoreCase(String nome);

}
