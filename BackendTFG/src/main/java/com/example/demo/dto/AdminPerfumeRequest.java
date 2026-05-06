package com.example.demo.dto;

import lombok.Data;

/**
 * DTO para crear y actualizar perfumes desde el panel de administración.
 */
@Data
public class AdminPerfumeRequest {
    private String nombre;
    private String descripcion;
    private Double precio;
    private String imagenUrl;
    private Integer stock;
    private Boolean enOferta;
    private Integer idGenero;
    private Long idCategoria;
    private Long idMarca;
}
