package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
    // Justificación TFG: Seguridad. La contraseña se puede recibir para login, 
    // pero nunca se enviará en los JSON de respuesta de la API.
    private String password;

    private String telefono;

    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "es_admin")
    private boolean esAdmin;

    private String estado; // "activo", "inactivo"

    /**
     * MÉTODOS DE LA INTERFAZ USERDETAILS
     * Justificación TFG: Implementamos esta interfaz para que Spring Security 
     * pueda usar directamente nuestra entidad en el flujo de autenticación.
     */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Si es_admin es 1, le damos ROLE_ADMIN y ROLE_USER, si no, solo ROLE_USER
        if (esAdmin) {
            return List.of(
                new SimpleGrantedAuthority("ROLE_ADMIN"),
                new SimpleGrantedAuthority("ROLE_USER")
            );
        }
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return email; // Usamos el email como identificador para el login
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Solo puede loguearse si el estado en la DB es "activo"
        return "activo".equalsIgnoreCase(this.estado);
    }

    // Método de ayuda para asignar la fecha antes de persistir
    @PrePersist
    protected void onCreate() {
        this.fechaRegistro = LocalDateTime.now();
        if (this.estado == null) this.estado = "activo";
    }
}
