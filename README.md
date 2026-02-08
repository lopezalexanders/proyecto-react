Task Management CRUD
Este es un proyecto de gestión de tareas desarrollado con React, Vite y TypeScript. Permite a los usuarios realizar las operaciones fundamentales de un sistema: Crear, Leer, Actualizar y Eliminar tareas (CRUD), consumiendo una API REST mediante Axios.

🚀 Tecnologías Utilizadas
React  - Biblioteca para la interfaz de usuario.

Vite - Herramienta de construcción (build tool) ultra rápida.

TypeScript - Para un desarrollo seguro con tipado estático.

Material UI (MUI) - Biblioteca de componentes para el diseño visual.

Axios - Cliente HTTP para el consumo de la API.

React Router Dom - Gestión de navegación y rutas.

Zod - Validación de esquemas y formularios.

✨ Características
Autenticación: Integración con tokens Bearer para proteger las rutas.

CRUD Completo:

Create: Formulario validado con Zod para añadir tareas.

Read: Visualización de tareas en una tabla dinámica de Material UI.

Update: Edición de nombre y estado de la tarea.

Delete: Eliminación de registros con confirmación.

Validación de Datos: Prevención de errores de tipo (ej. booleanos vs strings en checkboxes).

🛠️ Instalación y Configuración
Clona el repositorio:

Bash
git clone https://github.com/lopezalexanders/proyecto-react.git
cd proyecto-react
Instala las dependencias:

Bash
npm install
Configura las variables de entorno: Crea un archivo .env en la raíz del proyecto y añade la URL de tu API:

Fragmento de código
VITE_API_URL=http://tu-api-url.com
Inicia el servidor de desarrollo:

Bash
npm run dev
📂 Estructura del Proyecto
Plaintext
src/
├── components/     # Componentes reutilizables (Botones, Inputs)
├── hooks/          # Custom hooks (useAxios, useAuth)
├── pages/          # Vistas principales (TaskPage, NewTaskPage)
├── services/       # Lógica de llamadas a la API
├── types/          # Definiciones de interfaces TypeScript
└── App.tsx         # Configuración de rutas