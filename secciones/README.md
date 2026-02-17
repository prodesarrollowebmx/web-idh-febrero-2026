# Gestión de Contenido Dinámico

Este proyecto utiliza archivos JSON para gestionar el contenido de forma dinámica, sin necesidad de modificar código.

## Estructura de Archivos

```
secciones/
├── cursos.json          # Listado completo de cursos y talleres
├── clases.json          # Listado completo de clases regulares
└── home/
    ├── hero.json        # Sección principal (título, CTAs, clase destacada)
    ├── estadisticas.json # Números destacados (años, clases, alumnas)
    ├── clases.json      # Tipos de clases disponibles (solo para home)
    ├── diplomado.json   # Info del diplomado destacado
    ├── testimonios.json # Testimonios de alumnas
    ├── agenda.json      # Horarios semanales
    └── contacto.json    # Info de contacto y formulario
```

## Cómo Editar el Contenido

### 1. Cursos y Talleres (`secciones/cursos.json`)

Para agregar un nuevo curso, añade un objeto al array `cursos`:

```json
{
  "id": "meditacion-avanzada",
  "titulo": "Meditacion Avanzada",
  "descripcion": "Tecnicas profundas de concentracion",
  "fecha": "15 de marzo",
  "duracion": "6 horas",
  "instructor": "Nombre Instructor",
  "precio": "$1,500 MXN",
  "imagen": "https://images.unsplash.com/photo-XXXXX?w=600&h=400&fit=crop",
  "activo": true
}
```

**Nota:** Usa `"activo": false` para ocultar un curso sin eliminarlo. Todas las imágenes se muestran automáticamente en las tarjetas de cursos.

### 2. Clases Regulares (`secciones/clases.json`)

Para agregar una nueva clase regular, añade un objeto al array `clases`:

```json
{
  "id": "meditacion-guiada",
  "titulo": "Meditacion Guiada",
  "descripcion": "Practica de atencion plena y respiracion consciente",
  "horario": "Martes y viernes - 19:00",
  "duracion": "45 min",
  "nivel": "Todos los niveles",
  "instructor": "Nombre Instructor",
  "cupo": "15 personas",
  "precio": "$500 MXN/mes",
  "imagen": "https://images.unsplash.com/photo-XXXXX?w=400&h=300&fit=crop",
  "activo": true
}
```

**Campos:**
- **id**: Identificador único (sin espacios, usa guiones)
- **titulo**: Nombre de la clase
- **descripcion**: Descripción breve
- **horario**: Días y horas
- **duracion**: Duración en minutos
- **nivel**: "Todos los niveles", "Principiante", "Intermedio", "Avanzado"
- **instructor**: Nombre del instructor
- **cupo**: Máximo de participantes
- **precio**: Precio mensual
- **imagen**: URL de imagen desde Unsplash
- **activo**: `true` para mostrar, `false` para ocultar

### 3. Página de Inicio

#### Hero (`secciones/home/hero.json`)
- **etiqueta**: Tag superior
- **titulo**: Título principal
- **descripcion**: Descripción del sitio
- **ctas**: Botones de acción (tipo: "primario" o "secundario")
- **claseDestacada**: Información de la clase del día
- **anuncio**: Mensaje flotante

#### Estadísticas (`secciones/home/estadisticas.json`)
```json
{
  "label": "Etiqueta",
  "value": "100+"
}
```

#### Clases (`secciones/home/clases.json`)
Define los tipos de clases con título, descripción e ícono.

#### Diplomado (`secciones/home/diplomado.json`)
Contenido de la sección destacada del diplomado.

#### Testimonios (`secciones/home/testimonios.json`)
Lista de testimonios con id, nombre y comentario. Los testimonios se muestran en un carrusel animado que cambia automáticamente cada 5 segundos. Se recomienda tener al menos 4-6 testimonios para mejor experiencia visual.

#### Agenda (`secciones/home/agenda.json`)
Horarios semanales por día.

#### Contacto (`secciones/home/contacto.json`)
Información de contacto y configuración del formulario.

## Tips

- **Formato de fechas**: Usa el formato "DD de mes" (ej: "15 de marzo")
- **Caracteres especiales**: Evita tildes en los JSON o usa Unicode
- **IDs únicos**: Cada curso/clase debe tener un id único
- **Validación**: Usa un validador JSON online antes de guardar
- **Imágenes**: Las URLs de imágenes provienen de Unsplash (https://images.unsplash.com). Puedes:
  - Usar las URLs existentes
  - Buscar nuevas imágenes en https://unsplash.com y copiar la URL
  - Formato recomendado: `https://images.unsplash.com/photo-XXXXX?w=WIDTH&h=HEIGHT&fit=crop`
  - Las imágenes se cargan automáticamente desde servidores externos

## Visualización de Cambios

Los cambios en los archivos JSON se reflejan automáticamente en:

- **Home (`/`)**: Muestra los primeros 3 cursos activos + todas las secciones del home
- **Clases (`/clases`)**: Muestra todas las clases con `"activo": true`
- **Cursos (`/cursos`)**: Muestra todos los cursos con `"activo": true`

Después de editar, recarga la página para ver los cambios.
