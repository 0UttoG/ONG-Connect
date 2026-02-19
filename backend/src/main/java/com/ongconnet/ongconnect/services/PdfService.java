package com.ongconnet.ongconnect.services;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class PdfService {

    public byte[] generarComprobante(Integer idDonacion, String nombreDonante, String nombreProyecto, Double cantidad) {
        // Usamos ByteArrayOutputStream para crear el PDF en la memoria RAM, no en el disco
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            // 1. Título del Documento
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Comprobante Oficial de Donación", titleFont);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);

            // Espaciado
            document.add(new Paragraph(" "));
            document.add(new Paragraph("ONG-CONNECT", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14)));
            document.add(new Paragraph("--------------------------------------------------"));

            // 2. Cuerpo y Detalles de la Donación
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
            document.add(new Paragraph("Número de Recibo: #" + idDonacion, bodyFont));
            document.add(new Paragraph("Fecha y Hora: " + new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()), bodyFont));
            document.add(new Paragraph("Donante: " + nombreDonante, bodyFont));
            document.add(new Paragraph("Proyecto Apoyado: " + nombreProyecto, bodyFont));

            document.add(new Paragraph(" "));
            Font montoFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
            document.add(new Paragraph("Monto Total Donado: $" + String.format("%.2f", cantidad), montoFont));

            document.add(new Paragraph("--------------------------------------------------"));
            document.add(new Paragraph(" "));

            // 3. Pie de página
            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10);
            Paragraph footer = new Paragraph("Este documento certifica tu valioso aporte. ¡Gracias por hacer la diferencia y apoyar este proyecto!", footerFont);
            footer.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(footer);

            document.close();

            // Retornamos el archivo completo como bytes
            return out.toByteArray();

        } catch (Exception e) {
            System.err.println("❌ Error al generar el PDF: " + e.getMessage());
            return null;
        }
    }
}