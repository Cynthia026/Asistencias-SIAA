// docente-panel.js - Lógica del panel de docente

// Verificar autenticación
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userType = localStorage.getItem('userType');

if (!isLoggedIn || userType !== 'docente') {
    window.location.href = 'index.html';
}

// Obtener datos del usuario actual
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Actualizar avatar en header
document.getElementById('userAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.nombre)}&background=3B7DD6&color=fff&size=35`;

// Navegación del sidebar
const sidebarItems = document.querySelectorAll('.sidebar-item');
const views = {
    asistencias: document.getElementById('asistenciasView'),
    consulta: document.getElementById('consultaView')
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

// Datos de asistencias registradas
const asistenciasRegistradas = [
    { grupo: '8A', fecha: '10/02/2026' },
    { grupo: '4B', fecha: '21/02/2026' }
];

// Datos de alumnos
let alumnosData = [
    { 
        nombre: 'Cynthia', 
        nombreCompleto: 'Cynthia Martinez',
        email: 'c_marOf@gmail.com', 
        asistio: true,
        avatar: 'E91E63'
    },
    { 
        nombre: 'Nadia', 
        nombreCompleto: 'Nadia Serna',
        email: 'nadia.Serna09@gmail.com', 
        asistio: true,
        avatar: '9C27B0'
    },
    { 
        nombre: 'Melani', 
        nombreCompleto: 'Melani Figueroa',
        email: 'mel_fic0@gmail.com', 
        asistio: false,
        avatar: 'FF9800'
    }
];

// Renderizar tabla de asistencias registradas
function renderAsistenciasRegistradas() {
    const tbody = document.getElementById('asistenciasTableBody');
    tbody.innerHTML = '';
    
    // Cargar asistencias guardadas desde localStorage
    const asistenciasGuardadas = JSON.parse(localStorage.getItem('asistenciasRegistradas') || '[]');
    
    if (asistenciasGuardadas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px; color: var(--color-text-light);">
                    No hay asistencias registradas. Haz clic en "Nueva Asistencia" para comenzar.
                </td>
            </tr>
        `;
        return;
    }
    
    asistenciasGuardadas.reverse().forEach((asistencia, index) => {
        const tr = document.createElement('tr');
        const fechaFormateada = new Date(asistencia.fecha).toLocaleDateString('es-ES');
        
        tr.innerHTML = `
            <td>${asistencia.materia}</td>
            <td>${asistencia.grupo}</td>
            <td>${fechaFormateada}</td>
            <td><span class="badge badge-success">${asistencia.presentes}</span></td>
            <td><span class="badge badge-danger">${asistencia.ausentes}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-icon" onclick="verDetalleAsistencia(${asistenciasGuardadas.length - 1 - index})">Ver</button>
                    <button class="btn btn-danger btn-icon" onclick="eliminarAsistenciaRegistrada(${asistenciasGuardadas.length - 1 - index})">Eliminar</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Renderizar tabla de alumnos
function renderAlumnos() {
    const tbody = document.getElementById('alumnosTableBody');
    tbody.innerHTML = '';
    
    alumnosData.forEach((alumno, index) => {
        const tr = document.createElement('tr');
        const badgeClass = alumno.asistio ? 'badge-success' : 'badge-danger';
        const badgeIcon = alumno.asistio ? '✓' : '✗';
        
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(alumno.nombreCompleto)}&background=${alumno.avatar}&color=fff&size=30" 
                         alt="Avatar" style="border-radius: 50%;">
                    <span>${alumno.nombre}</span>
                </div>
            </td>
            <td>${alumno.email}</td>
            <td>
                <span class="badge ${badgeClass}" style="cursor: pointer;" onclick="toggleAsistencia(${index})">
                    ${badgeIcon}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para alternar asistencia
function toggleAsistencia(index) {
    alumnosData[index].asistio = !alumnosData[index].asistio;
    renderAlumnos();
}

// Función para guardar asistencias
function guardarAsistencias() {
    const fecha = document.getElementById('fechaFilter').value;
    const grupo = document.getElementById('grupoFilter').value || '8A';
    
    // Aquí se guardarían las asistencias en una base de datos
    alert(`Asistencias guardadas para el grupo ${grupo} en la fecha ${fecha}`);
    
    // Agregar a asistencias registradas
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES');
    asistenciasRegistradas.unshift({ grupo, fecha: fechaFormateada });
    renderAsistenciasRegistradas();
}

// Función para ver detalle de asistencia
function verDetalleAsistencia(index) {
    const asistenciasGuardadas = JSON.parse(localStorage.getItem('asistenciasRegistradas') || '[]');
    const asistencia = asistenciasGuardadas[index];
    
    if (!asistencia) return;
    
    let detalleHTML = `
        <strong>Materia:</strong> ${asistencia.materia}<br>
        <strong>Grupo:</strong> ${asistencia.grupo}<br>
        <strong>Fecha:</strong> ${new Date(asistencia.fecha).toLocaleDateString('es-ES')}<br>
        <strong>Presentes:</strong> ${asistencia.presentes}<br>
        <strong>Ausentes:</strong> ${asistencia.ausentes}<br><br>
        <strong>Detalle de alumnos:</strong><br>
    `;
    
    asistencia.alumnos.forEach(alumno => {
        const estado = alumno.asistio ? '✓ Presente' : '✗ Ausente';
        const comentario = alumno.comentario ? ` - ${alumno.comentario}` : '';
        detalleHTML += `<br>${alumno.nombre}: ${estado}${comentario}`;
    });
    
    alert(detalleHTML);
}

// Función para eliminar asistencia registrada
function eliminarAsistenciaRegistrada(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro de asistencia?')) {
        const asistenciasGuardadas = JSON.parse(localStorage.getItem('asistenciasRegistradas') || '[]');
        asistenciasGuardadas.splice(index, 1);
        localStorage.setItem('asistenciasRegistradas', JSON.stringify(asistenciasGuardadas));
        renderAsistenciasRegistradas();
        alert('Asistencia eliminada correctamente');
    }
}

// Inicializar vistas
renderAsistenciasRegistradas();
renderAlumnos();

// Event listeners para filtros
document.getElementById('grupoFilter').addEventListener('change', function() {
    // Aquí se cargarían los alumnos del grupo seleccionado
    console.log('Grupo seleccionado:', this.value);
});

document.getElementById('fechaFilter').addEventListener('change', function() {
    // Aquí se cargarían las asistencias de la fecha seleccionada
    console.log('Fecha seleccionada:', this.value);
});
