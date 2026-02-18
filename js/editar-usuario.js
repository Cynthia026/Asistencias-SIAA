// editar-usuario.js - Lógica de edición de usuario

// Verificar autenticación
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userType = localStorage.getItem('userType');

if (!isLoggedIn || userType !== 'administrador') {
    window.location.href = 'index.html';
}

// Obtener datos del usuario a editar desde localStorage
const userToEdit = JSON.parse(localStorage.getItem('editingUser'));

if (!userToEdit) {
    alert('No se encontró el usuario a editar');
    window.location.href = 'admin-panel.html';
}

// Cargar datos en el formulario
document.getElementById('nombreCompleto').value = userToEdit.nombre || '';
document.getElementById('rol').value = userToEdit.rol || '';
document.getElementById('correo').value = userToEdit.email || '';
document.getElementById('matricula').value = userToEdit.matricula || '';
document.getElementById('telefono').value = userToEdit.telefono || '';

// Manejar envío del formulario
document.getElementById('editUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuarioActualizado = {
        nombre: document.getElementById('nombreCompleto').value.trim(),
        rol: document.getElementById('rol').value,
        email: document.getElementById('correo').value.trim(),
        matricula: document.getElementById('matricula').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        avatar: userToEdit.avatar // Mantener el avatar original
    };
    
    const newPassword = document.getElementById('password').value;
    if (newPassword) {
        usuarioActualizado.password = newPassword;
    }
    
    // Guardar usuario actualizado
    localStorage.setItem('updatedUser', JSON.stringify(usuarioActualizado));
    
    alert('Usuario actualizado correctamente');
    window.location.href = 'admin-panel.html';
});

// Función para cancelar
function cancelar() {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.')) {
        localStorage.removeItem('editingUser');
        window.location.href = 'admin-panel.html';
    }
}
