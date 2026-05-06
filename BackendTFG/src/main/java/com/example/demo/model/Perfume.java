package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "perfumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_perfume") // Ajuste preventivo según tu estilo de BD
    private Long id;

    private String nombre;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    private Double precio;
    
    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "en_oferta")
    private Boolean enOferta;

    @Column(name = "id_genero")
    private Integer idGenero;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoriaEntity;

    @ManyToOne
    @JoinColumn(name = "id_marca") // Clave foránea que apunta a 'marcas'
    private Marca marca;

    @JsonProperty("idCategoria")
    public Long getIdCategoria() {
        return categoriaEntity != null ? categoriaEntity.getId() : null;
    }

    @JsonProperty("categoria")
    public String getCategoria() {
        if (categoriaEntity == null || categoriaEntity.getId() == null) {
            return null;
        }

        return switch (categoriaEntity.getId().intValue()) {
            case 1 -> "amaderado";
            case 2 -> "fresco";
            case 3 -> "oriental";
            case 4 -> "floral";
            case 5 -> "aromatico";
            default -> categoriaEntity.getNombre().toLowerCase();
        };
    }

    @JsonProperty("idGenero")
    public Integer getIdGenero() {
        return idGenero;
    }

    @JsonProperty("genero")
    public String getGenero() {
        return switch (idGenero == null ? 0 : idGenero) {
            case 1 -> "hombre";
            case 2 -> "mujer";
            case 3 -> "unisex";
            default -> "unisex";
        };
    }

    @JsonIgnore
    public Categoria getCategoriaEntity() {
        return categoriaEntity;
    }

    public void setCategoriaEntity(Categoria categoriaEntity) {
        this.categoriaEntity = categoriaEntity;
    }
}