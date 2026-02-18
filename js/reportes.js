// reportes.js - Lógica de reportes y estadísticas

// Verificar autenticación
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userType = localStorage.getItem('userType');

if (!isLoggedIn || userType !== 'docente') {
    window.location.href = 'index.html';
}

// Establecer fechas por defecto (último mes)
const hoy = new Date();
const haceMes = new Date();
haceMes.setMonth(haceMes.getMonth() - 1);

document.getElementById('fechaInicio').valueAsDate = haceMes;
document.getElementById('fechaFin').valueAsDate = hoy;

// Función para generar reporte
function generarReporte() {
    const materiaFilter = document.getElementById('materiaFilter').value;
    const grupoFilter = document.getElementById('grupoFilter').value;
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const fechaFin = new Date(document.getElementById('fechaFin').value);
    
    // Cargar asistencias guardadas
    const asistenciasGuardadas = JSON.parse(localStorage.getItem('asistenciasRegistradas') || '[]');
    
    if (asistenciasGuardadas.length === 0) {
        alert('No hay asistencias registradas para generar un reporte');
        return;
    }
    
    // Filtrar asistencias según criterios
    const asistenciasFiltradas = asistenciasGuardadas.filter(asistencia => {
        const fechaAsistencia = new Date(asistencia.fecha);
        const cumpleMateria = !materiaFilter || asistencia.materia === materiaFilter;
        const cumpleGrupo = !grupoFilter || asistencia.grupo === grupoFilter;
        const cumpleFecha = fechaAsistencia >= fechaInicio && fechaAsistencia <= fechaFin;
        
        return cumpleMateria && cumpleGrupo && cumpleFecha;
    });
    
    if (asistenciasFiltradas.length === 0) {
        alert('No se encontraron asistencias con los filtros seleccionados');
        return;
    }
    
    // Calcular estadísticas
    calcularEstadisticas(asistenciasFiltradas);
    
    // Generar tabla de reporte por alumno
    generarTablaReporte(asistenciasFiltradas);
    
    // Mostrar cards
    document.getElementById('estadisticasCard').style.display = 'block';
    document.getElementById('reporteCard').style.display = 'block';
    document.getElementById('graficaCard').style.display = 'block';
}

// Función para calcular estadísticas
function calcularEstadisticas(asistencias) {
    const totalClases = asistencias.length;
    
    // Calcular total de presentes y ausentes
    let totalPresentes = 0;
    let totalAusentes = 0;
    const alumnosMap = new Map();
    
    asistencias.forEach(asistencia => {
        totalPresentes += asistencia.presentes;
        totalAusentes += asistencia.ausentes;
        
        // Contar asistencias por alumno
        asistencia.alumnos.forEach(alumno => {
            if (!alumnosMap.has(alumno.matricula)) {
                alumnosMap.set(alumno.matricula, {
                    nombre: alumno.nombre,
                    asistencias: 0,
                    faltas: 0
                });
            }
            
            const alumnoData = alumnosMap.get(alumno.matricula);
            if (alumno.asistio) {
                alumnoData.asistencias++;
            } else {
                alumnoData.faltas++;
            }
        });
    });
    
    const totalAlumnos = alumnosMap.size;
    const totalRegistros = totalPresentes + totalAusentes;
    const promedioAsistencia = totalRegistros > 0 ? ((totalPresentes / totalRegistros) * 100).toFixed(1) : 0;
    
    // Contar alumnos en riesgo (<80%)
    let alumnosRiesgo = 0;
    alumnosMap.forEach(alumno => {
        const total = alumno.asistencias + alumno.faltas;
        const porcentaje = total > 0 ? (alumno.asistencias / total) * 100 : 0;
        if (porcentaje < 80) {
            alumnosRiesgo++;
        }
    });
    
    // Actualizar UI
    document.getElementById('totalClases').textContent = totalClases;
    document.getElementById('promedioAsistencia').textContent = promedioAsistencia + '%';
    document.getElementById('totalAlumnos').textContent = totalAlumnos;
    document.getElementById('alumnosRiesgo').textContent = alumnosRiesgo;
}

// Función para generar tabla de reporte
function generarTablaReporte(asistencias) {
    const alumnosMap = new Map();
    
    // Agrupar por alumno
    asistencias.forEach(asistencia => {
        asistencia.alumnos.forEach(alumno => {
            if (!alumnosMap.has(alumno.matricula)) {
                alumnosMap.set(alumno.matricula, {
                    nombre: alumno.nombre,
                    matricula: alumno.matricula,
                    asistencias: 0,
                    faltas: 0
                });
            }
            
            const alumnoData = alumnosMap.get(alumno.matricula);
            if (alumno.asistio) {
                alumnoData.asistencias++;
            } else {
                alumnoData.faltas++;
            }
        });
    });
    
    // Renderizar tabla
    const tbody = document.getElementById('reporteTableBody');
    tbody.innerHTML = '';
    
    // Convertir a array y ordenar por porcentaje (menor a mayor)
    const alumnosArray = Array.from(alumnosMap.values());
    alumnosArray.sort((a, b) => {
        const porcentajeA = (a.asistencias / (a.asistencias + a.faltas)) * 100;
        const porcentajeB = (b.asistencias / (b.asistencias + b.faltas)) * 100;
        return porcentajeA - porcentajeB;
    });
    
    alumnosArray.forEach(alumno => {
        const total = alumno.asistencias + alumno.faltas;
        const porcentaje = total > 0 ? ((alumno.asistencias / total) * 100).toFixed(1) : 0;
        
        let estado = '';
        let estadoClass = '';
        
        if (porcentaje >= 90) {
            estado = 'Excelente';
            estadoClass = 'badge-success';
        } else if (porcentaje >= 80) {
            estado = 'Bueno';
            estadoClass = 'badge-success';
        } else if (porcentaje >= 70) {
            estado = 'Regular';
            estadoClass = 'badge-warning';
        } else {
            estado = 'En Riesgo';
            estadoClass = 'badge-danger';
        }
        
        let percentageClass = 'percentage-high';
        if (porcentaje < 70) {
            percentageClass = 'percentage-low';
        } else if (porcentaje < 85) {
            percentageClass = 'percentage-medium';
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.matricula}</td>
            <td><span class="badge badge-success">${alumno.asistencias}</span></td>
            <td><span class="badge badge-danger">${alumno.faltas}</span></td>
            <td><span class="percentage ${percentageClass}">${porcentaje}%</span></td>
            <td><span class="badge ${estadoClass}">${estado}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para exportar reporte
function exportarReporte() {
    alert('Funcionalidad de exportación a Excel en desarrollo.\n\nEn una implementación real, aquí se generaría un archivo Excel con los datos del reporte usando librerías como SheetJS (xlsx).');
    
    // Código de ejemplo para implementación futura:
    // const wb = XLSX.utils.book_new();
    // const ws = XLSX.utils.table_to_sheet(document.querySelector('table'));
    // XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    // XLSX.writeFile(wb, 'reporte_asistencias.xlsx');
}
