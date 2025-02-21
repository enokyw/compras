# Usa la imagen oficial de Node.js 22
FROM node:22-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala PNPM globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia los archivos de dependencias antes para aprovechar la caché de Docker
COPY package.json pnpm-lock.yaml ./

# Instala dependencias con PNPM en modo producción
RUN pnpm install --frozen-lockfile --prod

# Copia el resto del código fuente
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]