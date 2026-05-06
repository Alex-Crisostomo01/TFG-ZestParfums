package com.example.demo.repository;

import com.example.demo.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * REPOSITORIO: MarcaRepository
 * Justificación TFG: Abstrae la persistencia de las marcas. 
 * Se hereda de JpaRepository para obtener operaciones CRUD básicas de forma automática.
 */
@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    // Aquí podrías añadir búsquedas personalizadas si fuera necesario, 
    // por ejemplo: Optional<Marca> findByNombre(String nombre);
}