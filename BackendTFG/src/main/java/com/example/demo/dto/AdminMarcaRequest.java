package com.example.demo.dto;

import lombok.Data;

/**
 * DTO para crear marcas desde el panel de administración.
 */
@Data
public class AdminMarcaRequest {
    private String nombre;
    private String paisOrigen;
    private String descripcion;
    private Integer activo;
    private String logoUrl;
}
