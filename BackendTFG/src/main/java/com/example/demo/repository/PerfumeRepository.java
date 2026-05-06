package com.example.demo.repository;

import com.example.demo.model.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
    
    // Si usas este método, Spring buscará p.marca.id
    @Query("SELECT p FROM Perfume p WHERE p.marca.id = :marcaId")
    List<Perfume> findByMarcaId(@Param("marcaId") Long marcaId);
}