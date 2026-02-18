// editar-materia.js - Lógica de edición de materia

// Verificar autenticación
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userType = localStorage.getItem('userType');

if (!isLoggedIn || userType !== 'administrador') {
    window.location.href = 'index.html';
}

// Obtener datos de la materia a editar desde localStorage
const materiaToEdit = JSON.parse(localStorage.getItem('editingMateria'));

if (!materiaToEdit) {
    alert('No se encontró la materia a editar');
    window.location.href = 'admin-panel.html';
}

// Cargar datos en el formulario
document.getElementById('nombreMateria').value = materiaToEdit.nombre || '';
document.getElementById('docenteMateria').value = materiaToEdit.docente || '';
document.getElementById('codigoMateria').value = materiaToEdit.codigo || '';
document.getElementById('creditosMateria').value = materiaToEdit.creditos || '';
document.getElementById('horarioMateria').value = materiaToEdit.horario || '';

// Manejar envío del formulario
document.getElementById('editMateriaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const materiaActualizada = {
        nombre: document.getElementById('nombreMateria').value.trim(),
        docente: document.getElementById('docenteMateria').value.trim(),
        codigo: document.getElementById('codigoMateria').value.trim(),
        creditos: document.getElementById('creditosMateria').value,
        horario: document.getElementById('horarioMateria').value.trim()
    };
    
    // Guardar materia actualizada
    localStorage.setItem('updatedMateria', JSON.stringify(materiaActualizada));
    
    alert('Materia actualizada correctamente');
    window.location.href = 'admin-panel.html';
});

// Función para cancelar
function cancelar() {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.')) {
        localStorage.removeItem('editingMateria');
        window.location.href = 'admin-panel.html';
    }
}
