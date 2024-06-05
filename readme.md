# Backend Pizzass App Usando NestJS y Microservicios


## Para Products Micro Service (MS)
1. Clonar Repositorio
2. Instalar Dependencias
3. Crear un archivo `.env` basado en `.env.template`
4. Ejecutar contenedor: ```docker compose up -d```
5. Ejecutar migration de prisma: `npx prisma migrate dev`
6. Ejecutar MS: ```npm run start:dev```

## Para Main Client Gateway
1. Clonar Repositorio
2. Instalar Dependencias
3. Crear un archivo `.env` basado en `.env.template`
4. Ejecutar MS: npm run ```start:dev```
