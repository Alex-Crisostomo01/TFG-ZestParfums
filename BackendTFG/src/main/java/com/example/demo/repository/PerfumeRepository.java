package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Perfume;
@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
    // Filtrar por marca
    List<Perfume> findByMarcaIdMarca(Long idMarca);
    
    // Filtrar por género
    List<Perfume> findByIdGenero(Integer idGenero);
    
    // Filtrar por oferta
    List<Perfume> findByEnOfertaTrue();
}
