// Función para descargar PDF
document.getElementById('downloadPdf').addEventListener('click', function() {
  const clientName = document.getElementById('clientName')?.value || 'Cliente';
  const kw = parseFloat(powerKw.value) || 5;
  
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: 'Lora', Georgia, serif; color: #1a1a1a; padding: 40px;">
      <div style="text-align: center; border-bottom: 2px solid #5AD1E5; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="font-size: 24px; font-weight: 600; color: #2E4A5A; margin-bottom: 5px;">☀️ Presupuesto Solar</div>
        <div style="font-size: 12px; color: #6b6b6b; letter-spacing: 0.5px; text-transform: uppercase;">Alonso & Espinosa · Consultoría Operativa</div>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="font-size: 12px; color: #6b6b6b; text-transform: uppercase; margin-bottom: 5px;">Cliente</div>
        <div style="font-size: 16px; font-weight: 600; color: #2E4A5A;">${clientName}</div>
      </div>
      
      <div style="margin-bottom: 25px;">
        <div style="font-size: 12px; color: #6b6b6b; text-transform: uppercase; margin-bottom: 5px;">Fecha</div>
        <div style="font-size: 14px; color: #1a1a1a;">${new Date().toLocaleDateString('es-ES')}</div>
      </div>
      
      <div style="background: #eef3fd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #5AD1E5;">
        <div style="font-size: 12px; color: #6b6b6b; text-transform: uppercase; margin-bottom: 8px;">Resumen del Proyecto</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <div style="font-size: 11px; color: #6b6b6b;">Potencia Instalada</div>
            <div style="font-size: 16px; font-weight: 700; color: #2E4A5A;">${kw} kW</div>
          </div>
          <div>
            <div style="font-size: 11px; color: #6b6b6b;">Precio Final</div>
            <div style="font-size: 16px; font-weight: 700; color: #5AD1E5;">${finalPrice.textContent}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: #6b6b6b;">Margen</div>
            <div style="font-size: 16px; font-weight: 700; color: #2E4A5A;">${marginValue.textContent}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: #6b6b6b;">ROI Cliente</div>
            <div style="font-size: 16px; font-weight: 700; color: #2E4A5A;">${roi.textContent} años</div>
          </div>
        </div>
      </div>
      
      <div style="background: white; border: 1px solid #dfe6e9; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <div style="font-size: 12px; color: #6b6b6b; text-transform: uppercase; margin-bottom: 15px; font-weight: 600;">Desglose de Costes</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
          <div><span style="color: #6b6b6b;">Materiales:</span> <strong style="color: #2E4A5A;">${totalMaterials.textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Mano Obra:</span> <strong style="color: #2E4A5A;">${totalLabor.textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Coste Total:</span> <strong style="color: #2E4A5A;">${totalCost.textContent}</strong></div>
          <div><span style="color: #6b6b6b;">Margen Bruto:</span> <strong style="color: #5AD1E5;">${marginAmount.textContent}</strong></div>
        </div>
      </div>
      
      <div style="background: #f4f7f9; padding: 15px; border-radius: 8px; border-top: 2px solid #5AD1E5; margin-top: 30px; padding-top: 20px; text-align: center; font-size: 11px; color: #6b6b6b;">
        <div style="margin-bottom: 8px;">Alonso & Espinosa · Consultoría Operativa</div>
        <div>www.alonsoespinosa.com · operaciones.alonsoespinosa@outlook.com</div>
      </div>
    </div>
  `;
  
  const opt = {
    margin: 10,
    filename: `presupuesto-solar-${clientName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  
  html2pdf().set(opt).from(element).save();
});

// Función para limpiar datos
document.getElementById('resetForm').addEventListener('click', function() {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
    document.getElementById('solarForm').reset();
    calculate();
  }
});
