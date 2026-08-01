#  Sistema de Gestión de Productos

Sistema de gestión de productos construido con NestJS, TypeORM y PostgreSQL. API RESTful completa con operaciones CRUD, búsqueda, filtros y gestión de inventario.

##  Características

-  CRUD completo de productos
-  Creación y actualización en masa
-  Búsqueda por nombre y categoría
-  Gestión de stock y descuentos
-  Validaciones robustas
-  Base de datos PostgreSQL
-  TypeScript
-  Arquitectura escalable

##  Tecnologías

- **Backend:** NestJS 10.x
- **Lenguaje:** TypeScript
- **Base de datos:** PostgreSQL
- **ORM:** TypeORM
- **Validación:** class-validator & class-transformer

##  Requisitos previos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn

##  Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/dedaFSdeveloper/Sistema-de-Gesti-n-de-Productos.git
cd products-system
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y configura tus credenciales:
```bash
cp .env.example .env
```

Edita `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_DATABASE=products_db
PORT=4000
```

### 4. Crear la base de datos
```sql
CREATE DATABASE products_db;
```

### 5. Ejecutar la aplicación
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

La API estará disponible en `http://localhost:4000`

##  Endpoints de la API

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products` | Obtener todos los productos |
| GET | `/products/:id` | Obtener producto por ID |
| GET | `/products/search?term=` | Buscar productos por nombre |
| GET | `/products/category/:category` | Filtrar por categoría |
| GET | `/products/active` | Productos activos |
| GET | `/products/statistics` | Estadísticas del inventario |
| POST | `/products` | Crear un producto |
| POST | `/products/bulk` | Crear múltiples productos |
| PATCH | `/products/:id` | Actualizar producto |
| PUT | `/products/bulk` | Actualizar múltiples productos |
| PATCH | `/products/:id/stock` | Actualizar stock |
| PATCH | `/products/:id/discount` | Aplicar descuento |
| DELETE | `/products/:id` | Eliminar producto |
| DELETE | `/products` | Eliminar múltiples productos |

### Ejemplos de uso

#### Crear un producto
```bash
POST /products
Content-Type: application/json

{
  "name": "Laptop Dell XPS 15",
  "description": "Laptop de alto rendimiento",
  "price": 1299.99,
  "stock": 10,
  "category": "Electrónica",
  "sku": "DELL-XPS-15"
}
```

#### Crear múltiples productos
```bash
POST /products/bulk
Content-Type: application/json

{
  "products": [
    {
      "name": "Mouse Logitech",
      "description": "Mouse ergonómico",
      "price": 29.99,
      "stock": 50,
      "category": "Accesorios"
    },
    {
      "name": "Teclado Mecánico",
      "description": "Teclado gaming RGB",
      "price": 89.99,
      "stock": 30,
      "category": "Accesorios"
    }
  ]
}
```

##  Estructura del proyecto
```
src/
├── products/
│   ├── dto/
│   │   ├── create-product.dto.ts
│   │   ├── update-product.dto.ts
│   │   └── bulk-create-product.dto.ts
│   ├── entities/
│   │   └── product.entity.ts
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
├── app.module.ts
└── main.ts
```

##  Modelo de datos
```typescript
Product {
  id: string (UUID)
  name: string
  description: string
  price: number
  stock: number
  category?: string
  sku?: string
  isActive: boolean
  images?: string[]
  discount?: number
  createdAt: Date
  updatedAt: Date
}
```

##  Testing
```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov

##  Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request


Ezequiel Molinari
- GitHub: [@dedaFSdeveloper](https://github.com/dedaFSdeveloper)
- LinkedIn: [Ezequiel Molinari](https://www.linkedin.com/in/ezmolinari12/)

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!
