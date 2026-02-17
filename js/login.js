// Inicio de sesión

// Usuarios de ejemplo para pruebas
const usuarios = {
    alumno: [
        { matricula: '2011089', password: '123456', nombre: 'Cynthia Martinez', correo: 'cynthia@example.com' },
        { matricula: '2011090', password: '123456', nombre: 'Nadia Salvador', correo: 'nadia@example.com' }
    ],
    docente: [
        { matricula: 'DOC001', password: '123456', nombre: 'Jesus Avila', correo: 'jesus.avila@example.com' }
    ],
    administrador: [
        { matricula: 'ADMIN001', password: '123456', nombre: 'Administrador Sistema', correo: 'admin@example.com' }
    ]
};

// Verificar si hay un tipo de usuario seleccionado
const userType = localStorage.getItem('userType');
if (!userType) {
    // Si no hay tipo de usuario, redirigir a la página principal
    window.location.href = 'index.html';
}

// Manejar el envío del formulario
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const matricula = document.getElementById('matricula').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Buscar usuario en la base de datos simulada
    const usuario = usuarios[userType].find(u => u.matricula === matricula && u.password === password);
    
    if (usuario) {
        // Login exitoso
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        
        // Redirigir según el tipo de usuario
        switch(userType) {
            case 'alumno':
                window.location.href = 'alumno-panel.html';
                break;
            case 'docente':
                window.location.href = 'docente-panel.html';
                break;
            case 'administrador':
                window.location.href = 'admin-panel.html';
                break;
        }
    } else {
        // Login fallido
        errorMessage.textContent = 'Matrícula o contraseña incorrecta';
        errorMessage.style.display = 'block';
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});