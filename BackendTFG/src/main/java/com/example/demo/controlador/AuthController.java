package com.example.demo.controlador;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtService;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.JwtResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * CONTROLADOR: Autenticación
 * Justificación TFG: Centraliza las operaciones de acceso al sistema. 
 * Implementa el protocolo de intercambio de credenciales por tokens (JWT), 
 * garantizando una comunicación Stateless entre el Frontend y el Backend.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // Inyección por constructor: Recomendado por Spring para facilitar tests unitarios
    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 1. Delegar la validación de credenciales al AuthenticationManager
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        // 2. Si la autenticación es exitosa, se genera el token JWT
        Usuario usuario = (Usuario) auth.getPrincipal();
        String token = jwtService.generateToken(usuario.getUsername());

        // 3. Retornar el token y datos de usuario en la respuesta
        return ResponseEntity.ok(new JwtResponse(
            token,
            "Bearer",
            usuario.getEmail(),
            usuario.isEsAdmin() ? 1 : 0
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("El email ya está registrado.");
        }

        Usuario usuario = Usuario.builder()
            .nombre(registerRequest.getNombre())
            .email(registerRequest.getEmail())
            .password(passwordEncoder.encode(registerRequest.getPassword()))
            .telefono(registerRequest.getTelefono())
            .esAdmin(false)
            .estado("activo")
            .build();

        Usuario savedUser = usuarioRepository.save(usuario);
        String token = jwtService.generateToken(savedUser.getUsername());

        return ResponseEntity.ok(new JwtResponse(
            token,
            "Bearer",
            savedUser.getEmail(),
            0
        ));
    }
}
