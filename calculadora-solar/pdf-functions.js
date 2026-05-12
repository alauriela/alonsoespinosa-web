// Función para redirigir a Cal.com en lugar de descargar PDF
document.getElementById('downloadPdf').addEventListener('click', function() {
  const clientName = document.getElementById('clientName')?.value || '';
  const message = clientName 
    ? `Hola, me gustaría hablar sobre un presupuesto solar personalizado para ${clientName}.`
    : 'Hola, me gustaría hablar sobre un presupuesto solar personalizado.';
  
  // Redirigir a Cal.com con mensaje contextual
  window.open('https://cal.eu/alonso-espinosa/primera-conversacion-exploratoria', '_blank');
});

// Función para limpiar datos
document.getElementById('resetForm').addEventListener('click', function() {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
    document.getElementById('solarForm').reset();
    calculate();
  }
});
