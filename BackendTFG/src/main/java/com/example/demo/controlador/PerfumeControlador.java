package com.example.demo.controlador;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Perfume;
import com.example.demo.service.PerfumeService;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController 
@RequestMapping("/api/perfumes") 
public class PerfumeControlador {

    @Autowired 
    private PerfumeService perfumeService;

    // Obtener todos los perfumes
    @GetMapping
    public List<Perfume> obtenerPerfumes(){
        return perfumeService.listarPerfumes();
    }

    // Obtener un perfume por ID
    @GetMapping("/{id}")
    public ResponseEntity<Perfume> getPerfumeById(@PathVariable("id") Long id) { 
        // Delegamos la búsqueda al servicio para mantener el controlador limpio
        return perfumeService.buscarPorId(id)
                .map(perfume -> ResponseEntity.ok().body(perfume))
                .orElse(ResponseEntity.notFound().build());
    }
}