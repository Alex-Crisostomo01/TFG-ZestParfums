package com.example.demo.service;

import com.example.demo.model.Perfume;
import com.example.demo.repository.PerfumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * SERVICIO: PerfumeService
 * Justificación TFG: Esta capa contiene la lógica de negocio, actuando como
 * intermediaria entre el Controlador (API) y el Repositorio (Base de Datos).
 * Separa las responsabilidades siguiendo el principio SOLID de Responsabilidad Única.
 */
@Service
public class PerfumeService {

    private final PerfumeRepository repo;

    /**
     * Inyección por Constructor (Recomendado por Spring 3.x)
     * Justificación: Facilita el testing y asegura que el servicio sea inmutable.
     */
    public PerfumeService(PerfumeRepository repo) {
        this.repo = repo;
    }

    @Transactional(readOnly = true)
    public List<Perfume> listarPerfumes() {
        return repo.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Perfume> buscarPorId(Long id) {
        return repo.findById(id);
    }

    /**
     * Filtrado Multicriterio Dinámico
     * Justificación TFG: Se implementa una lógica de filtrado acumulativo mediante Java Streams.
     * Se han corregido las llamadas a los getters para que coincidan con el modelo unificado:
     * - p.getMarca().getId() en lugar de getIdMarca()
     * - p.getGenero() (String) en lugar de idGenero (Integer)
     */
    @Transactional(readOnly = true)
    public List<Perfume> filtrarPerfumes(Long idMarca, String genero, String categoria) {
        List<Perfume> perfumes = repo.findAll();

        return perfumes.stream()
            .filter(p -> idMarca == null || (p.getMarca() != null && p.getMarca().getId().equals(idMarca)))
            .filter(p -> genero == null || genero.isEmpty() || (p.getGenero() != null && p.getGenero().equalsIgnoreCase(genero)))
            .filter(p -> categoria == null || categoria.isEmpty() ||
                    (p.getCategoriaEntity() != null && p.getCategoriaEntity().getNombre().equalsIgnoreCase(categoria)))
            .collect(Collectors.toList());
    }
}