# Backend Pizzass App Usando NestJS y Microservicios

## Para levantar el Servidor de Nats
- ```docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats```

## Para Categories Micro Service (MS)
1. Clonar Repositorio
2. Instalar Dependencias
3. Crear un archivo `.env` basado en `.env.template`
4. Ejecutar contenedor: ```docker compose up -d```
5. Ejecutar migration de prisma: `npx prisma migrate dev`
6. Ejecutar MS: ```npm run start:dev```

## Para Orders Micro Service (MS)
1. Clonar Repositorio
2. Instalar Dependencias
3. Crear un archivo `.env` basado en `.env.template`
4. Ejecutar migration de prisma from (MONGODB): `npx prisma generate`
5. Ejecutar MS: npm run ```start:dev```

## Para Main Client Gateway
1. Clonar Repositorio
2. Instalar Dependencias
3. Crear un archivo `.env` basado en `.env.template`
4. Ejecutar MS: npm run ```start:dev```
