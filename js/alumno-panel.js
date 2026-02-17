// alumno-panel.js - Lógica del panel de alumno

// Verificar autenticación
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userType = localStorage.getItem('userType');

if (!isLoggedIn || userType !== 'alumno') {
    window.location.href = 'index.html';
}

// Obtener datos del usuario actual
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Actualizar mensaje de bienvenida
document.getElementById('welcomeMessage').textContent = `Bienvenido, ${currentUser.nombre.split(' ')[0]}`;

// Actualizar avatar en header
document.getElementById('userAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.nombre)}&background=3B7DD6&color=fff&size=35`;

// Datos de ejemplo del perfil
const perfilData = {
    nombre: 'Cynthia Martinez Garcia',
    matricula: '2011089',
    correo: '1221100869@itpachuca.edu.mx',
    carrera: 'Ingeniería en Sistemas Computacionales',
    semestre: '8°'
};

// Actualizar datos del perfil
document.getElementById('profileName').textContent = currentUser.nombre;
document.getElementById('profileAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.nombre)}&background=E91E63&color=fff&size=120`;
document.getElementById('profileMatricula').textContent = perfilData.matricula;
document.getElementById('profileNombre').textContent = perfilData.nombre;
document.getElementById('profileCorreo').textContent = perfilData.correo;
document.getElementById('profileCarrera').textContent = perfilData.carrera;
document.getElementById('profileSemestre').textContent = perfilData.semestre;

// Navegación del sidebar
const sidebarItems = document.querySelectorAll('.sidebar-item');
const views = {
    asistencias: document.getElementById('asistenciasView'),
    perfil: document.getElementById('perfilView')
};

sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        
        if (view === 'salir') {
            cerrarSesion();
            return;
        }
        
        // Remover clase active de todos los items
        sidebarItems.forEach(i => i.classList.remove('active'));
        
        // Agregar clase active al item clickeado
        this.classList.add('active');
        
        // Ocultar todas las vistas
        Object.values(views).forEach(v => v.style.display = 'none');
        
        // Mostrar la vista seleccionada
        if (views[view]) {
            views[view].style.display = 'block';
        }
    });
});

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Datos de asistencias (ejemplo)
const asistenciasData = [
    { materia: 'Redes', asistencias: 10, total: 11, porcentaje: 95 },
    { materia: 'Base de Datos', asistencias: 15, total: 16, porcentaje: 93 },
    { materia: 'Sistemas operativos', asistencias: 17, total: 18, porcentaje: 95 },
    { materia: 'Programación', asistencias: 20, total: 25, porcentaje: 15 }
];

// Renderizar tabla de asistencias
function renderAsistencias() {
    const tbody = document.getElementById('asistenciasTableBody');
    tbody.innerHTML = '';
    
    asistenciasData.forEach(asistencia => {
        const tr = document.createElement('tr');
        
        let percentageClass = 'percentage-high';
        if (asistencia.porcentaje < 70) {
            percentageClass = 'percentage-low';
        } else if (asistencia.porcentaje < 85) {
            percentageClass = 'percentage-medium';
        }
        
        tr.innerHTML = `
            <td>${asistencia.materia}</td>
            <td>${asistencia.asistencias}</td>
            <td><span class="percentage ${percentageClass}">${asistencia.porcentaje}%</span></td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Cargar asistencias al inicio
renderAsistencias();

// Función para cambiar foto de perfil
function cambiarFotoPerfil(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoData = e.target.result;
            
            // Actualizar avatar en perfil
            document.getElementById('profileAvatar').src = photoData;
            
            // Actualizar avatar en header
            document.getElementById('userAvatar').src = photoData;
            
            // Guardar en localStorage
            localStorage.setItem('userPhoto_' + currentUser.matricula, photoData);
            
            alert('Foto de perfil actualizada correctamente');
        };
        reader.readAsDataURL(file);
    }
}

// Cargar foto de perfil guardada al iniciar
window.addEventListener('load', function() {
    const savedPhoto = localStorage.getItem('userPhoto_' + currentUser.matricula);
    if (savedPhoto) {
        document.getElementById('profileAvatar').src = savedPhoto;
        document.getElementById('userAvatar').src = savedPhoto;
    }
});
