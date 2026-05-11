// Función para descargar PDF
document.getElementById('downloadPdf').addEventListener('click', function() {
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: 'Lora', Georgia, serif; color: #1a1a1a; padding: 40px;">
      <div style="text-align: center; border-bottom: 2px solid #5AD1E5; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: 600; color: #2E4A5A; margin-bottom: 5px;">🏗️ Presupuesto de Obra</div>
        <div style="font-size: 12px; color: #6b6b6b; letter-spacing: 0.5px; text-transform: uppercase;">Alonso & Espinosa · Consultoría Operativa</div>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="font-size: 12px; color: #6b6b6b; text-transform: uppercase; margin-bottom: 5px;">Fecha</div>
        <div style="font-size: 14px; color: #1a1a1a;">${new Date().toLocaleDateString('es-ES')}</div>
      </div>
      
      <div style="background: #eef3fd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #5AD1E5;">
        <div style="font-size: 12px; color: #6b6b6b; text-transform: uppercase; margin-bottom: 8px;">Resumen del Presupuesto</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 13px;">
          <div><span style="color: #6b6b6b;">Materiales:</span> <strong style="color: #2E4A5A;">${document.getElementById('totalMateriales').textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Mano Obra:</span> <strong style="color: #2E4A5A;">${document.getElementById('totalManoObra').textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Coste Ejecución:</span> <strong style="color: #2E4A5A;">${document.getElementById('costeEjecucion').textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Gastos Generales:</span> <strong style="color: #2E4A5A;">${document.getElementById('gastosGenerales').textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Beneficio Industrial:</span> <strong style="color: #2E4A5A;">${document.getElementById('beneficio').textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Base Imponible:</span> <strong style="color: #2E4A5A;">${document.getElementById('baseImponible').textContent}</strong></div>
          <div><span style="color: #6b6b6b;">IVA:</span> <strong style="color: #2E4A5A;">${document.getElementById('ivaTotal').textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Total Presupuesto:</span> <strong style="color: #5AD1E5;">${document.getElementById('totalPresupuesto').textContent}</strong></div>
        </div>
      </div>
      
      <div style="background: white; border: 1px solid #dfe6e9; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <div style="font-size: 12px; color: #6b6b6b; text-transform: uppercase; margin-bottom: 15px; font-weight: 600;">Margen</div>
        <div style="font-size: 16px; font-weight: 700; color: #5AD1E5;">${document.getElementById('margenPorcentaje').textContent}</div>
      </div>
      
      <div style="background: #f4f7f9; padding: 15px; border-radius: 8px; border-top: 2px solid #5AD1E5; margin-top: 30px; padding-top: 20px; text-align: center; font-size: 11px; color: #6b6b6b;">
        <div style="margin-bottom: 8px;">Alonso & Espinosa · Consultoría Operativa</div>
        <div>www.alonsoespinosa.com · operaciones.alonsoespinosa@outlook.com</div>
      </div>
    </div>
  `;
  
  const opt = {
    margin: 10,
    filename: `presupuesto-obra-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  
  html2pdf().set(opt).from(element).save();
});

// Función para exportar a CSV
document.getElementById('downloadCsv').addEventListener('click', function() {
  let csv = 'PRESUPUESTO DE OBRA\n';
  csv += 'Fecha: ' + new Date().toLocaleDateString('es-ES') + '\n\n';
  
  csv += 'MATERIALES\n';
  csv += 'Descripción,Precio Unitario,Unidades,Subtotal\n';
  document.querySelectorAll('.material-row').forEach(row => {
    const desc = row.querySelector('.material-desc').value;
    const price = row.querySelector('.material-price').value;
    const qty = row.querySelector('.material-qty').value;
    const subtotal = (price * qty).toFixed(2);
    csv += `"${desc}",${price},${qty},${subtotal}\n`;
  });
  
  csv += '\nMANO DE OBRA\n';
  csv += 'Descripción,Precio Unitario,Horas,Subtotal\n';
  document.querySelectorAll('.labor-row').forEach(row => {
    const desc = row.querySelector('.labor-desc').value;
    const price = row.querySelector('.labor-price').value;
    const hours = row.querySelector('.labor-hours').value;
    const subtotal = (price * hours).toFixed(2);
    csv += `"${desc}",${price},${hours},${subtotal}\n`;
  });
  
  csv += '\nRESULTADOS\n';
  csv += 'Concepto,Valor\n';
  csv += `Total Materiales,${document.getElementById('totalMateriales').textContent}\n`;
  csv += `Total Mano Obra,${document.getElementById('totalManoObra').textContent}\n`;
  csv += `Coste Ejecución,${document.getElementById('costeEjecucion').textContent}\n`;
  csv += `Total Presupuesto,${document.getElementById('totalPresupuesto').textContent}\n`;
  csv += `Margen,${document.getElementById('margenPorcentaje').textContent}\n`;
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `presupuesto-obra-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Función para limpiar datos
document.getElementById('resetForm').addEventListener('click', function() {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
    document.getElementById('budgetForm').reset();
    calculate();
  }
});
