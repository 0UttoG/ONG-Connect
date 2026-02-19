package com.ongconnet.ongconnect.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // @Async permite enviar el correo en segundo plano para que la API responda rápido
    @Async
    public void enviarComprobanteReal(String correoDestino, String nombreDonante, byte[] pdfBytes) {
        try {
            System.out.println("⏳ Preparando envío de correo a: " + correoDestino);

            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(correoDestino);
            helper.setSubject("¡Gracias por tu donación, " + nombreDonante + "!");

            String cuerpoHtml = "<h3>Tu apoyo transforma realidades</h3>"
                    + "<p>Hola <b>" + nombreDonante + "</b>,</p>"
                    + "<p>Hemos recibido tu aporte con éxito. Adjunto a este correo encontrarás el comprobante oficial de tu donación.</p>"
                    + "<p>Gracias por ser parte de ONG-Connect.</p>";

            helper.setText(cuerpoHtml, true);

            // Adjuntar el PDF generado en memoria
            if (pdfBytes != null && pdfBytes.length > 0) {
                helper.addAttachment("Comprobante_Donacion_ONG.pdf", new ByteArrayResource(pdfBytes));
            }

            mailSender.send(mensaje);
            System.out.println("✅ ¡Correo enviado exitosamente a " + correoDestino + "!");

        } catch (MessagingException e) {
            System.err.println("❌ Error al enviar el correo: " + e.getMessage());
        }
    }
}