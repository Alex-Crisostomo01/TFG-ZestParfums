package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

/**
 * SERVICIO: JwtService
 * Justificación TFG: Implementación del estándar JSON Web Token (RFC 7519).
 * Se utiliza la librería JJWT (0.12+) para gestionar la autenticación Stateless.
 * Esta clase centraliza la creación y validación de tokens para asegurar la integridad de la sesión.
 */
@Service
public class JwtService {

    @Value("${jwt.secret:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_}")
    private String secretKey;

    @Value("${jwt.expiration:86400000}") // 24 horas
    private long jwtExpiration;

    // Generar Token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    // Extraer Username
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Validar Token
    public boolean isTokenValid(String token, String username) {
        final String extractedUser = extractUsername(token);
        return (extractedUser.equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Justificación TFG: Uso de 'verifyWith' y 'build' para parsear el JWT.
     * En versiones 0.12.x, el parser utiliza una interfaz fluida que separa 
     * la configuración del procesamiento del token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}