package com.ongconnet.ongconnect.services;

import com.ongconnet.ongconnect.entities.Donante;
import com.ongconnet.ongconnect.entities.Usuario;
import com.ongconnet.ongconnect.repositories.DonanteRepository;
import com.ongconnet.ongconnect.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class AuthService {

    @Autowired private DonanteRepository donanteRepository;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private BCryptPasswordEncoder encoder;

    @Transactional
    public void registrarNuevoDonante(Map<String, String> datos) {
        String passwordEncriptada = encoder.encode(datos.get("password"));

        donanteRepository.registrarDonanteDesdeSP(
                datos.get("nombre"),
                datos.get("apellido"),
                datos.get("correo"),
                datos.get("telefono"),
                passwordEncriptada,
                5 // ¡CORREGIDO! Rol 5 asignado estrictamente para Donantes
        );
    }

    public Map<String, Object> login(String correo, String password) {
        // 1. Verificamos si el correo existe
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas"));

        // 2. Comparamos la clave
        if (!encoder.matches(password, usuario.getPasswordHash())) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        // 3. Preparamos la respuesta base (sirve para cualquier usuario)
        Map<String, Object> respuesta = new java.util.HashMap<>();
        respuesta.put("idUsuario", usuario.getIdUsuario());
        respuesta.put("idRol", usuario.getIdRol()); // ¡Aquí va el ID del Rol para el Frontend!

        // 4. Lógica dinámica según el Rol
        if (usuario.getIdRol() == 5) { // Si es un Donante
            Donante donante = donanteRepository.findByCorreo(correo)
                    .orElseThrow(() -> new RuntimeException("Perfil de donante no encontrado"));

            respuesta.put("mensaje", "¡Bienvenido donante " + donante.getNombre() + "!");
            respuesta.put("idDonante", donante.getIdDonante());
        } else {
            // Si es Administrador (u otro rol), no le mandamos idDonante
            respuesta.put("mensaje", "¡Bienvenido al panel de administración!");
        }

        return respuesta;
    }
    }