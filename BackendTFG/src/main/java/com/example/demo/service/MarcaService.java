package com.example.demo.service;

import com.example.demo.model.Marca;
import com.example.demo.repository.MarcaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MarcaService {

    private final MarcaRepository marcaRepository;

    public MarcaService(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    @Transactional(readOnly = true)
    public List<Marca> listarTodas() {
        return marcaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Marca> buscarPorId(Long id) {
        return marcaRepository.findById(id);
    }
}