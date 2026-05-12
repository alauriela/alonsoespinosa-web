// Función para redirigir a Cal.com en lugar de descargar PDF
document.getElementById('downloadPdf').addEventListener('click', function() {
  // Redirigir a Cal.com para solicitar informe detallado
  window.open('https://cal.eu/alonso-espinosa/primera-conversacion-exploratoria', '_blank');
});

// Función para redirigir a Cal.com en lugar de exportar CSV
document.getElementById('downloadCsv').addEventListener('click', function() {
  // Redirigir a Cal.com para solicitar informe detallado
  window.open('https://cal.eu/alonso-espinosa/primera-conversacion-exploratoria', '_blank');
});

// Función para limpiar datos
document.getElementById('resetForm').addEventListener('click', function() {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
    document.getElementById('budgetForm').reset();
    calculate();
  }
});
