package com.example.demo.repository;

import com.example.demo.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * REPOSITORIO: CategoriaRepository
 * Justificación TFG: Proporciona acceso CRUD para las categorías del catálogo.
 */
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
