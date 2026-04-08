package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Perfume;
@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

}
