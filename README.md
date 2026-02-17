# Sistema de Control de Asistencias Academicas SIAA

Sistema para el registro y control de asistencias de alumnos, con interfaces diferenciadas para Alumnos, Docentes y Administradores.

## Estructura de Archivos

 index.html                    # Pantalla principal - Selección de tipo de usuario
 index.js                      # JavaScript de la pantalla principal

 login.html                    # Pantalla de inicio de sesión
 login.js                      # JavaScript del login

 alumno-panel.html             # Panel del alumno
 alumno-panel.js               # JavaScript del panel de alumno

 docente-panel.html            # Panel del docente
 docente-panel.js              # JavaScript del panel de docente

 registrar-asistencia.html     # Pantalla de registro de asistencia
 registrar-asistencia.js       # JavaScript del registro de asistencia

 reportes.html                 # Pantalla de reportes y estadísticas
 reportes.js                   # JavaScript de reportes

 admin-panel.html              # Panel del administrador
 admin-panel.js                # JavaScript del panel de administrador

 editar-usuario.html           # Pantalla de edición de usuario
 editar-usuario.js             # JavaScript de edición de usuario

 editar-materia.html           # Pantalla de edición de materia
 editar-materia.js             # JavaScript de edición de materia

 styles.css                    # Estilos globales (CSS común para todas las pantallas)

 README.md                     # Este archivo

## Colores del Sistema

El sistema utiliza los siguientes colores definidos en `styles.css`:

- **Azul Principal**: #1E5BA8
- **Azul Oscuro**: #163F75
- **Azul Claro**: #3B7DD6
- **Gris Secundario**: #CCCCCC
- **Verde**: #28A745
- **Rojo**: #DC3545
- **Amarillo**: #FFC107
- **Fondo Claro**: #F5F5F5

## Instrucciones de Uso

### 1. Credenciales de Prueba

#### Alumno
- **Matrícula**: 2011089
- **Contraseña**: 123456

#### Docente
- **Matrícula**: DOC001
- **Contraseña**: 123456

#### Administrador
- **Matrícula**: ADMIN001
- **Contraseña**: 123456

### 2. Flujo de Navegación

1. **Pantalla Principal** (`index.html`)
   - Selecciona el tipo de usuario (Alumno, Docente o Administrador)
   
2. **Login** (`login.html`)
   - Ingresa tu matrícula y contraseña
   - El sistema te redirigirá al panel correspondiente

3. **Paneles de Usuario**
   - Cada tipo de usuario tiene su propio panel con funcionalidades específicas

## Funcionalidades por Tipo de Usuario

### Alumno
- **Visualizar Asistencias**: Ver tabla de asistencias por materia con porcentajes
- **Ver Perfil**: Consultar información personal y datos académicos
- **Cambiar Foto de Perfil**: Subir y actualizar foto de perfil personalizada

### Docente
- **Registrar Asistencias**: Sistema completo de registro de asistencias con:
  - Selección de materia, grupo y fecha
  - Lista de alumnos con checkboxes interactivos
  - Campo de comentarios por alumno (retardos, justificantes, etc.)
  - Marcar todos/ninguno con un clic
  - Guardado automático en localStorage
- **Ver Asistencias Registradas**: Historial de todas las asistencias guardadas con:
  - Visualización de materia, grupo, fecha, presentes y ausentes
  - Ver detalle completo de cada registro
  - Eliminar registros anteriores
- **Consultar Alumnos**: Ver lista de alumnos con su estado de asistencia
- **Reportes y Estadísticas**: Sistema completo de reportes con:
  - Filtros por materia, grupo y rango de fechas
  - Estadísticas generales (total de clases, promedio de asistencia, alumnos en riesgo)
  - Tabla detallada por alumno con porcentajes y estado
  
### Administrador
- **Gestión de Usuarios**: 
  - Agregar nuevos usuarios (alumnos, docentes, administradores)
  - Editar información de usuarios existentes (pantalla dedicada)
  - Eliminar usuarios del sistema
  - Visualización con avatares personalizados
- **Gestión de Materias**: 
  - Agregar nuevas materias con código, créditos y horario
  - Editar información de materias (pantalla dedicada)
  - Asignar docentes a materias
  - Eliminar materias del sistema
- **Gestión de Grupos**: 
  - Ver alumnos por grupo y materia
  - Buscar alumnos en tiempo real
  - Editar y eliminar alumnos de grupos


## Características Destacadas

### Sistema Completo de Asistencias
- Registro de asistencias con lista de alumnos interactiva
- Guardado automático de registros
- Visualización de historial completo
- Sistema de comentarios por alumno

### Reportes y Estadísticas
- Filtros avanzados (materia, grupo, fechas)
- Estadísticas en tiempo real
- Identificación automática de alumnos en riesgo
- Tabla detallada con porcentajes y estados

### Gestión Administrativa
- CRUD completo de usuarios
- CRUD completo de materias
- Pantallas dedicadas de edición
- Persistencia de datos con localStorage
- Búsqueda en tiempo real

### Personalización de Perfil
- Subida de foto de perfil para alumnos
- Actualización automática del avatar en todas las vistas
- Persistencia de foto personalizada

## Seguridad

- Implementa autenticación real con backend
- Encripta las contraseñas
- Implementa validación de datos en el servidor
- Usa una base de datos real


**© 2026 Control de Asistencias** - Sistema desarrollado con fines educativos
