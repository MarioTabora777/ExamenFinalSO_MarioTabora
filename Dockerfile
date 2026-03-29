# ============================================================
# Dockerfile corregido - Examen 2, Actividad 1 Parte A
# Errores identificados y corregidos:
#   ERROR 1: FROM node:latest → FROM node:18-alpine (version fija + imagen ligera)
#   ERROR 2: COPY . . → COPY package*.json ./ (primero dependencias para cache)
#   ERROR 3: npm install → RUN npm install (faltaba instruccion RUN)
#   ERROR 4: EXPOSE 80 → EXPOSE 3000 (puerto correcto de Node.js)
# ============================================================

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
