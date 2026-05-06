package com.example.demo.controlador;

import com.example.demo.model.Perfume;
import com.example.demo.service.PerfumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CONTROLADOR: PerfumeController
 * Justificación TFG: Expone los recursos de la entidad Perfume a través de una API REST.
 * Se utiliza ResponseEntity para tener un control total sobre los códigos de estado HTTP.
 */
@RestController
@RequestMapping("/api/perfumes")
@CrossOrigin(origins = "http://localhost:5173") 
public class PerfumeController {

    private final PerfumeService perfumeService;

    // Inyección por constructor: Mejor práctica para facilitar el testing
    public PerfumeController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    /**
     * Endpoint para listar y filtrar perfumes.
     * Justificación TFG: Permite al Frontend realizar peticiones dinámicas.
     * Ejemplo: /api/perfumes?idMarca=1&oferta=true
     */
    @GetMapping
    public ResponseEntity<List<Perfume>> getPerfumes(
            @RequestParam(required = false) Long idMarca,
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) String categoria) {
        
        List<Perfume> lista = perfumeService.filtrarPerfumes(idMarca, genero, categoria);
        
        if (lista.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content si no hay resultados
        }
        
        return ResponseEntity.ok(lista); // 200 OK con la lista
    }

    @GetMapping("/{id}")
    public ResponseEntity<Perfume> getById(@PathVariable Long id) {
        return perfumeService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build()); // 404 Not Found
    }
}