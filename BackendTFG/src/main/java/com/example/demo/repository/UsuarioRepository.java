package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * INTERFAZ: UsuarioRepository
 * Justificación TFG: Heredamos de JpaRepository para obtener automáticamente 
 * todas las operaciones CRUD (Create, Read, Update, Delete) sin escribir SQL manual, 
 * lo que reduce la posibilidad de errores y acelera el desarrollo.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Consulta derivada (Derived Query) para buscar por Email.
     * Justificación TFG: Al usar la convención de nombres de Spring Data JPA, 
     * el framework genera automáticamente la consulta SQL: 
     * "SELECT * FROM usuarios WHERE email = ?".
     * 
     * @param email El correo electrónico del usuario.
     * @return Un Optional que contiene al usuario si existe, evitando NullPointerExceptions.
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica si un email ya está registrado.
     * Útil para la lógica de registro de nuevos usuarios.
     */
    boolean existsByEmail(String email);
}
