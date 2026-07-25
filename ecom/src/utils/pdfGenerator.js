/**
 * PDF Generator Utility
 * 
 * Uses jsPDF + html2canvas to create a styled PDF receipt.
 * The PDF includes: store name, transaction ID, order items table,
 * totals, delivery details, and payment status.
 * 
 * WhatsApp integration sends the receipt as a message link.
 */

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generates a PDF receipt from a receipt DOM element
 * @param {string} elementId - The ID of the receipt container element
 * @returns {Promise<Blob>} - Returns the PDF as a Blob
 */
export const generateReceiptPDF = async (elementId = "receipt-container") => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Receipt element not found");

  // Capture the receipt element as a canvas
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution for crisp print
    useCORS: true, // Allow cross-origin images
    backgroundColor: "#ffffff",
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Calculate dimensions to fit the A4 page
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = pdfHeight;
  let position = 0;

  // Add image to PDF (handle multi-page if content overflows)
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pdf.internal.pageSize.getHeight();

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
  }

  // Return as blob
  return pdf.output("blob");
};

/**
 * Opens the WhatsApp Web link with a formatted order summary message
 * @param {string} phoneNumber - Customer's mobile number
 * @param {object} orderDetails - Order info { id, items, total, paymentMethod }
 */
export const sendToWhatsApp = (phoneNumber, orderDetails) => {
  // Format the phone number: remove any non-digit characters
  const cleanedPhone = phoneNumber.replace(/\D/g, "");
  
  // Build a structured order summary message
  const itemsList = orderDetails.items
    .map((item) => `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`)
    .join("\n");

  const message = encodeURIComponent(
    `🛍️ *Order Confirmed!*\n\n` +
    `*Order ID:* ${orderDetails.id}\n` +
    `*Payment:* ${orderDetails.paymentMethod}\n\n` +
    `*Items:*\n${itemsList}\n\n` +
    `*Total:* $${orderDetails.total.toFixed(2)}\n\n` +
    `Thank you for shopping with us! 🙏`
  );

  // Open WhatsApp Web with pre-filled message
  window.open(`https://wa.me/${cleanedPhone}?text=${message}`, "_blank");
};

/**
 * Generates a PDF and then sends it via WhatsApp (download + share)
 * On mobile, users can share the PDF via WhatsApp from their file system.
 * On desktop, opens WhatsApp Web with order summary text.
 */
export const generateAndSharePDF = async (orderDetails, phoneNumber) => {
  try {
    // First try to generate PDF
    const pdfBlob = await generateReceiptPDF();
    
    // Create a download link for the PDF
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${orderDetails.id}.pdf`;
    link.click();
    
    // Clean up the object URL
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    
    // Also open WhatsApp with order summary
    sendToWhatsApp(phoneNumber, orderDetails);
  } catch (error) {
    console.error("PDF generation failed:", error);
    // Fallback: just send WhatsApp message
    sendToWhatsApp(phoneNumber, orderDetails);
  }
};

/**
 * Cleans up the receipt element for printing
 */
export const printReceipt = () => {
  window.print();
};