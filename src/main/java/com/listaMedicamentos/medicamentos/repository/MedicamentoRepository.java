package com.listaMedicamentos.medicamentos.repository;

import com.listaMedicamentos.medicamentos.entity.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicamentoRepository extends JpaRepository<Medicamento, Long>{

}
