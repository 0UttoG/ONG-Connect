package com.ongconnet.ongconnect.controllers;

import com.ongconnet.ongconnect.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired private AuthService authService;

    // ==========================================
    // 1. ENDPOINT PARA REGISTRARSE
    // ==========================================
    @PostMapping("/register")
    public ResponseEntity<?> registrarDonante(@RequestBody Map<String, String> body) {
        try {
            authService.registrarNuevoDonante(body);
            return ResponseEntity.ok(Map.of("mensaje", "Registro exitoso. ¡Usuario y Donante creados!"));

        } catch (DataIntegrityViolationException e) {
            // AQUÍ ATRAPAMOS EL ERROR DEL CORREO DUPLICADO
            if (e.getMessage() != null && e.getMessage().contains("usuarios_correo_key")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Este correo ya está registrado. Por favor, intenta iniciar sesión o usa otro."));
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Error de base de datos. Verifica tu información."));

        } catch (Exception e) {
            // Cualquier otro error raro cae aquí
            return ResponseEntity.badRequest().body(Map.of("error", "Error del servidor: " + e.getMessage()));
        }
    }

    // ==========================================
    // 2. ENDPOINT PARA INICIAR SESIÓN (LOGIN)
    // ==========================================
    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody Map<String, String> body) {
        try {
            // Mandamos el correo y contraseña a AuthService para que los valide
            Map<String, Object> respuesta = authService.login(body.get("correo"), body.get("password"));

            // Si la clave es correcta, devuelve el mensaje de bienvenida y el ID
            return ResponseEntity.ok(respuesta);

        } catch (RuntimeException e) {
            // Si la clave es incorrecta, devuelve un error 401 (No Autorizado)
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}