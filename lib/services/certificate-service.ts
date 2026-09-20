/**
 * Certificate Generation Service
 * Uses jsPDF for client-side PDF generation
 */

import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

interface CertificateData {
  userName: string;
  courseTitle: string;
  certificateId: string;
  issuedAt: Date | string;
}

/**
 * Generate a certificate PDF
 * This is a client-side function that creates and downloads a PDF
 */
export async function generateCertificatePDF(data: CertificateData): Promise<Blob> {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors
  const primaryColor = [255, 140, 0]; // #ff8c00
  const darkColor = [40, 40, 40];
  const lightColor = [245, 245, 245];

  // Background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 20, 'F'); // Top stripe

  // Main content area
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 20, pageWidth, pageHeight - 20, 'F');

  // Border
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 40, { align: 'center' });

  // Decorative line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.3);
  doc.line(30, 50, pageWidth - 30, 50);

  // Statement
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(...darkColor);
  
  const statement = 'This certifies that';
  doc.text(statement, pageWidth / 2, 65, { align: 'center' });

  // User name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...primaryColor);
  doc.text(data.userName, pageWidth / 2, 80, { align: 'center' });

  // Completion text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(...darkColor);
  doc.text('has successfully completed the course', pageWidth / 2, 95, { align: 'center' });

  // Course title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text(data.courseTitle, pageWidth / 2, 110, { align: 'center' });

  // Certificate ID
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.text(`Certificate ID: ${data.certificateId}`, pageWidth / 2, 125, { align: 'center' });

  // Issue date
  const issueDate = data.issuedAt instanceof Date ? data.issuedAt.toLocaleDateString('en-US') : new Date(data.issuedAt).toLocaleDateString('en-US');
  doc.text(`Issued on: ${issueDate}`, pageWidth / 2, 135, { align: 'center' });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('DIGENTIC TECH', pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('Hands-on AI + MERN Education', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Convert to blob
  const blob = new Blob([doc.output('blob')], { type: 'application/pdf' });
  return blob;
}

/**
 * Generate and download certificate directly in the browser
 */
export async function downloadCertificate(data: CertificateData): Promise<void> {
  const blob = await generateCertificatePDF(data);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `certificate-${data.certificateId}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Server-side PDF generation (using pdfkit for Node.js)
 * This is for server-side certificate generation
 */
export async function generateCertificatePDFServer(data: CertificateData): Promise<Buffer> {
  // This is a placeholder - in a real implementation, you would use a library like pdfkit
  // For now, we'll return a simple PDF using jspdf on the server
  const { default: PDFDocument } = await import('pdfkit');
  
  return new Promise<Buffer>((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        size: 'A4', 
        layout: 'landscape',
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });
      
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Title
      doc.fontSize(24).fillColor('#ff8c00').text('CERTIFICATE OF COMPLETION', { align: 'center' });
      doc.moveDown();

      // Statement
      doc.fontSize(14).fillColor('#000').text('This certifies that', { align: 'center' });
      doc.moveDown();

      // User name
      doc.fontSize(24).fillColor('#ff8c00').text(data.userName, { align: 'center' });
      doc.moveDown();

      // Completion text
      doc.fontSize(14).fillColor('#000').text('has successfully completed the course', { align: 'center' });
      doc.moveDown();

      // Course title
      doc.fontSize(20).fillColor('#ff8c00').text(data.courseTitle, { align: 'center' });
      doc.moveDown();

      // Certificate ID
      doc.fontSize(10).fillColor('#000').text(`Certificate ID: ${data.certificateId}`, { align: 'center' });
      doc.moveDown();

      // Issue date
      const issueDate = data.issuedAt instanceof Date ? data.issuedAt.toLocaleDateString('en-US') : new Date(data.issuedAt).toLocaleDateString('en-US');
      doc.fontSize(10).fillColor('#000').text(`Issued on: ${issueDate}`, { align: 'center' });
      doc.moveDown();
      doc.moveDown();

      // Footer
      doc.fontSize(10).fillColor('#999').text('DIGENTIC TECH', { align: 'center' });
      doc.text('Hands-on AI + MERN Education', { align: 'center' });
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
