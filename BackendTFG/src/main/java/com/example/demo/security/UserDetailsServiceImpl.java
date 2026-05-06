package com.example.demo.security;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * SERVICIO: UserDetailsServiceImpl
 * Justificación TFG: Implementa la interfaz central de Spring Security para 
 * la carga de datos de usuario. Actúa como capa de servicio entre la 
 * persistencia (JPA) y el motor de autenticación.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    /**
     * Inyección por Constructor.
     * Justificación TFG: Es la mejor práctica recomendada por Spring. 
     * Permite que el componente sea inmutable, facilita las pruebas unitarias 
     * (Testing) y detecta errores de dependencias en tiempo de compilación.
     */
    public UserDetailsServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Carga al usuario desde la DB utilizando el email.
     * 
     * @param email Identificador único introducido en el login.
     * @return UserDetails objeto compatible con Spring Security.
     * @throws UsernameNotFoundException Si el correo no existe en la DB.
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Buscamos al usuario usando el repositorio que definimos previamente
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el email: " + email));

        /**
         * NOTA TÉCNICA: Como nuestra clase 'Usuario' ya implementa 'UserDetails' 
         * y tiene definidos los métodos getAuthorities() y isEnabled(), 
         * no hace falta crear un objeto 'User' manualmente. Retornamos la entidad directamente.
         */
        return usuario;
    }
}