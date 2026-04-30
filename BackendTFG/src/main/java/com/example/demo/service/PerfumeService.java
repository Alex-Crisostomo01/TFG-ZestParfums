package com.example.demo.service;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Perfume;
import com.example.demo.repository.PerfumeRepository;

@Service
public class PerfumeService {
	@Autowired
	private PerfumeRepository repo;
	
	public List<Perfume> listarPerfumes(){
		List<Perfume> lista = repo.findAll();
	    return lista;
	}
	public Optional<Perfume> buscarPorId(Long id) {
        return repo.findById(id);
    }

	public List<Perfume> filtrarPerfumes(Long idMarca, Integer idGenero, Boolean oferta) {
    if (idMarca != null) return repo.findByMarcaIdMarca(idMarca);
    if (idGenero != null) return repo.findByIdGenero(idGenero);
    if (oferta != null && oferta) return repo.findByEnOfertaTrue();
    return repo.findAll();
}
	}

