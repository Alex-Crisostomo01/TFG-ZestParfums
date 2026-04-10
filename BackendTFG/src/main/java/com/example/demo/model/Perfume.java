package com.example.demo.model;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;


@Entity // Define esta clase como una tabla MySql
@Table(name="perfumes") // tiene que ser el mismo nombre que en el .sql

public class Perfume {
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public BigDecimal getPrecio() {
		return precio;
	}

	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public LocalDate getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(LocalDate fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Boolean getActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
	}



	public Long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}
	public String getImagenUrl() {
    return imagenUrl;
}

	public void setImagenUrl(String imagenUrl) {
    this.imagenUrl = imagenUrl;
}
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_perfume") // 👈 En el SQL se llama id_perfume, no id
    private Long id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private BigDecimal precio; // 👈 En SQL es Decimal, en Java mejor usar BigDecimal

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "fecha_creacion", insertable = false, updatable = false)
    private LocalDate fechaCreacion;

    @Column(nullable = false)
    private Boolean activo = true;



    @Column(name = "id_categoria")
    private Long idCategoria;

	@Column(name = "id_genero")
    private Integer idGenero;
	public Integer getIdGenero() { return idGenero; }
	public void setIdGenero(Integer idGenero) { this.idGenero = idGenero; }

	@Column(name = "imagen_url")
		private String imagenUrl;

	@ManyToOne
	@JoinColumn(name = "id_marca")
	@JsonIgnoreProperties("perfumes")
	private Marca marca;

	// Getter para la marca
	public Marca getMarca() { return marca; }

	@Column(name = "en_oferta")
private Boolean enOferta;

public Boolean getEnOferta() {
    return enOferta;
}

public void setEnOferta(Boolean enOferta) {
    this.enOferta = enOferta;
}
	
}
