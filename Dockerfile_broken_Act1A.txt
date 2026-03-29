# ============================================================
# Dockerfile con errores intencionales - Examen 2, Actividad 1 Parte A
# Tarea: identifica y corrige los 4 errores para que el build funcione.
#        Comando de verificacion: docker build -t myapp .
# ============================================================

FROM node:latest                      # ERROR 1

WORKDIR /app

COPY . .                              # ERROR 2

npm install --production              # ERROR 3

EXPOSE 80                             # ERROR 4

CMD node index.js
