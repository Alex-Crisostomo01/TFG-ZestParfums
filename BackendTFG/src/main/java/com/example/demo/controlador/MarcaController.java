package com.example.demo.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Marca;
import com.example.demo.repository.MarcaRepository;

@RestController 
@RequestMapping("/api/marcas")
@CrossOrigin(origins = "*") // Para que React pueda conectar
public class MarcaController {

    @Autowired
    private MarcaRepository marcaRepository; // Asegúrate de tener este Repository creado

    @GetMapping
    public List<Marca> listarTodas() {
        return marcaRepository.findAll();
    }
}


