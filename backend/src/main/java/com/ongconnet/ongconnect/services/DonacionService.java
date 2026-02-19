package com.ongconnet.ongconnect.services;

import com.ongconnet.ongconnect.entities.Donante;
import com.ongconnet.ongconnect.entities.Proyecto;
import com.ongconnet.ongconnect.repositories.DonacionRepository;
import com.ongconnet.ongconnect.repositories.DonanteRepository;
import com.ongconnet.ongconnect.repositories.ProyectoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class DonacionService {

    @Autowired
    private DonacionRepository donacionRepository;
    @Autowired
    private DonanteRepository donanteRepository;
    @Autowired
    private ProyectoRepository proyectoRepository;
    @Autowired
    private PdfService pdfService;
    /**
     *
     */
    @Autowired
    private EmailService emailService;



    @Transactional
    public String procesarDonacion(Integer idSede, Integer idDonante, Integer idTipo, Integer idProyecto, BigDecimal cantidad, String descripcion, Boolean estadoComprobante) {

        Integer idDonacion = donacionRepository.registrarDonacionValidada(
                idSede, idDonante, idTipo, idProyecto, cantidad, descripcion, estadoComprobante
        );

        // BUSQUEDA DE DATOS
        Donante donante = donanteRepository.findById(Long.valueOf(idDonante)).orElse(null);
        Proyecto proyecto = proyectoRepository.findById(idProyecto).orElse(null);

        // DIAGNÓSTICO EN CONSOLA
        if (donante == null) System.out.println("⚠️ ALERTA: No se encontró el donante con ID: " + idDonante);
        if (proyecto == null) System.out.println("⚠️ ALERTA: No se encontró el proyecto con ID: " + idProyecto);

        if (donante != null && proyecto != null) {
            // Ajustamos a los nombres que Hibernate mostró en tu consola (nombre y nombre_proyecto)
            String nombreDonante = donante.getNombre();
            String nombreProyecto = proyecto.getNombreProyecto();

            byte[] pdfBytes = pdfService.generarComprobante(idDonacion, nombreDonante, nombreProyecto, cantidad.doubleValue());

            // CORREO DE PRUEBA FORZADO
            String correoDestino = donante.getCorreo();
            System.out.println("🚀 Intentando disparar EmailService para: " + correoDestino);
            emailService.enviarComprobanteReal(correoDestino, nombreDonante, pdfBytes);

            return "Donación exitosa ID: " + idDonacion + ". Correo enviado a pruebas.";
        }

        return "Donación guardada (ID: " + idDonacion + "), pero no se encontró donante/proyecto para el correo.";
    }
}