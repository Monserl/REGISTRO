document.getElementById('registroEvento').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Limpiar mensajes de error anteriores
    clearErrorMessages();
    
    // Validar campos
    const isValidNombre = validateNombre();
    const isValidCorreo = validateCorreo();
    const isValidTelefono = validateTelefono();
    const isValidIntereses = validateIntereses();
    const isValidHorario = validateHorario();
    const isValidFecha = validateFecha();
    const isValidHora = validateHora();
    const isValidArchivo = validateArchivo();
    
    // Si todas las validaciones son correctas
    if (isValidNombre && isValidCorreo && isValidTelefono && isValidIntereses && 
        isValidHorario && isValidFecha && isValidHora && isValidArchivo) {
      alert('Registro exitoso. ¡Gracias por registrarte!');

    }
  });
  
  function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(element => {
      element.textContent = '';
    });
  }
  
  // Validaciones adicionales
  function validateNombre() {
    const nombre = document.getElementById('nombre').value.trim();
    const errorElement = document.getElementById('error-nombre');
    
    if (!nombre) {
      errorElement.textContent = 'El nombre es obligatorio.';
      return false;
    }
    
    if (nombre.length < 3) {
      errorElement.textContent = 'El nombre debe tener al menos 3 caracteres.';
      return false;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      errorElement.textContent = 'El nombre solo puede contener letras y espacios.';
      return false;
    }
    
    return true;
  }
  
  function validateCorreo() {
    const correo = document.getElementById('correo').value.trim();
    const errorElement = document.getElementById('error-correo');
    
    if (!correo) {
      errorElement.textContent = 'El correo electrónico es obligatorio.';
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errorElement.textContent = 'Por favor ingresa un correo electrónico válido.';
      return false;
    }
    
    return true;
  }
  
  function validateTelefono() {
    const telefono = document.getElementById('telefono').value.trim();
    const errorElement = document.getElementById('error-telefono');
    
    if (!telefono) {
      errorElement.textContent = 'El teléfono es obligatorio.';
      return false;
    }
    
    const telefonoRegex = /^[0-9]{10}$/;
    if (!telefonoRegex.test(telefono)) {
      errorElement.textContent = 'El teléfono debe tener 10 dígitos numéricos.';
      return false;
    }
    
    return true;
  }
  
  function validateIntereses() {
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const errorElement = document.getElementById('error-intereses');
    
    if (intereses.length === 0) {
      errorElement.textContent = 'Selecciona al menos un área de interés.';
      return false;
    }
    
    return true;
  }
  
  function validateHorario() {
    const horario = document.querySelector('input[name="horario"]:checked');
    const errorElement = document.getElementById('error-horario');
    
    if (!horario) {
      errorElement.textContent = 'Selecciona un horario preferido.';
      return false;
    }
    
    return true;
  }
  
  function validateFecha() {
    const fechaInput = document.getElementById('fecha');
    const fecha = new Date(fechaInput.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const errorElement = document.getElementById('error-fecha');
    
    if (!fechaInput.value) {
      errorElement.textContent = 'La fecha es obligatoria.';
      return false;
    }
    
    if (fecha < hoy) {
      errorElement.textContent = 'La fecha no puede ser anterior al día de hoy.';
      return false;
    }
    
    // Validar que no sea más de 3 meses en el futuro
    const tresMesesDespues = new Date();
    tresMesesDespues.setMonth(tresMesesDespues.getMonth() + 3);
    
    if (fecha > tresMesesDespues) {
      errorElement.textContent = 'La fecha no puede ser más de 3 meses en el futuro.';
      return false;
    }
    
    return true;
  }
  
  function validateHora() {
    const horaInput = document.getElementById('hora');
    const horarioSeleccionado = document.querySelector('input[name="horario"]:checked');
    const errorElement = document.getElementById('error-hora');
    
    if (!horaInput.value) {
      errorElement.textContent = 'La hora es obligatoria.';
      return false;
    }
    
    if (!horarioSeleccionado) return true; 
    
    const [horas, minutos] = horaInput.value.split(':').map(Number);
    let horaValida = true;
    
    switch(horarioSeleccionado.value) {
      case 'mañana':
        horaValida = (horas >= 9 && horas < 12);
        break;
      case 'tarde':
        horaValida = (horas >= 14 && horas < 17);
        break;
      case 'noche':
        horaValida = (horas >= 19 && horas < 22);
        break;
    }
    
    if (!horaValida) {
      errorElement.textContent = `La hora debe estar dentro del horario ${horarioSeleccionado.value} seleccionado.`;
      return false;
    }
    
    return true;
  }
  
  function validateArchivo() {
    const archivoInput = document.getElementById('archivo');
    const errorElement = document.getElementById('error-archivo');
    
    if (archivoInput.files.length > 0) {
      const archivo = archivoInput.files[0];
      const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
      const tamanoMaximo = 2 * 1024 * 1024; // 2MB
      
      if (!tiposPermitidos.includes(archivo.type)) {
        errorElement.textContent = 'Solo se permiten archivos PDF, JPG o PNG.';
        return false;
      }
      
      if (archivo.size > tamanoMaximo) {
        errorElement.textContent = 'El archivo no debe exceder los 2MB.';
        return false;
      }
    }
    
    return true;
  }