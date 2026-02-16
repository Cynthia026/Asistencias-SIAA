// index.js - Lógica de la pantalla principal

/**
 * Selecciona el tipo de usuario y redirige a la pantalla de login
 * @param {string} userType - Tipo de usuario: 'alumno', 'docente', 'administrador'
 */
function selectUserType(userType) {
 
    // Guardar el tipo de usuario seleccionado
    localStorage.setItem('userType', userType);
    
    // Redirigir a la pantalla de login
    window.location.href = 'login.html';
}

// Limpiar localStorage al cargar la página principal
window.addEventListener('load', () => {
    // Solo limpiar si no hay una sesión activa
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        localStorage.clear();
    }
});
