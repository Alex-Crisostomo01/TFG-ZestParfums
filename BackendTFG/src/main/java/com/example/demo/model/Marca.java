package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * ENTIDAD: Marca
 * Justificación TFG: Representa la tabla 'marcas' en la BD. 
 * Se utiliza @Column para mapear nombres de Java con nombres reales de la BD
 * evitando errores de 'Unknown column' y manteniendo la integridad referencial.
 */
@Entity
@Table(name = "marcas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Marca {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_marca") // Coincide con tu captura de pantalla
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "pais_origen")
    private String paisOrigen;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "activo")
    private Integer activo; // Usamos Integer porque en tu imagen aparece como 1

    @Column(name = "logo_url")
    private String logoUrl;
}