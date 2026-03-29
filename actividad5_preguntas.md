# Actividad 5: Preguntas Conceptuales (2 pts)

## 5. Diferencia entre Integracion Continua (CI) y Entrega Continua (CD)

**Integracion Continua (CI)** se enfoca en integrar y validar el codigo automaticamente cada vez que un desarrollador hace un cambio. Incluye ejecutar pruebas, linting y analisis de codigo para detectar errores lo antes posible. El objetivo es asegurar que el codigo nuevo no rompa lo existente.

**Entrega Continua (CD)** va un paso mas alla: una vez que el codigo pasa todas las validaciones de CI, se despliega automaticamente a un ambiente (staging o produccion). El objetivo es que el software siempre este listo para ser liberado a los usuarios finales de forma rapida y confiable.

En resumen: CI valida el codigo, CD lo despliega.

---

## 6. GitHub self-hosted runner y cuando usarlo

Un **self-hosted runner** es una maquina (servidor, VM o contenedor) que tu mismo configuras y conectas a GitHub Actions para ejecutar los workflows, en lugar de usar los runners que GitHub proporciona en la nube.

**Cuando es necesario usarlo:**
- Cuando necesitas hardware especifico (GPU, mas RAM, arquitectura ARM)
- Cuando necesitas acceso a recursos internos de tu red (bases de datos privadas, servidores internos)
- Cuando los tiempos de ejecucion en los runners de GitHub son muy largos y quieres mayor velocidad
- Cuando necesitas software o herramientas que no estan disponibles en los runners de GitHub

---

## 7. Proposito de los GitHub Environments y como se usan en workflows

Los **GitHub Environments** permiten definir ambientes de despliegue (como `staging`, `production`) con reglas de proteccion y secrets especificos para cada ambiente.

**Proposito:**
- Configurar secrets que solo estan disponibles en un ambiente especifico
- Agregar reglas de proteccion como aprobaciones manuales antes de desplegar
- Tener un historial de deployments por ambiente
- Controlar quien puede desplegar a cada ambiente

**Como se usan en workflows:**
```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production    # Se referencia el environment aqui
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: ./deploy.sh
        env:
          API_TOKEN: ${{ secrets.API_TOKEN }}  # Secret del environment
```

---

## 8. Rollback strategy y como implementarla en un pipeline de CD

Una **rollback strategy** es un plan para revertir un despliegue a una version anterior cuando el nuevo deployment falla o causa problemas en produccion. Es esencial para minimizar el tiempo de inactividad.

**Como implementarla en un pipeline de CD:**

1. **Versionamiento de deployments:** Etiquetar cada release con un tag de Git (v1.0, v1.1) para poder identificar versiones anteriores.

2. **Redespliegue automatico:** Si las pruebas post-deploy fallan, el pipeline automaticamente despliega la version anterior:
```yaml
- name: Health check
  run: curl -f https://mi-app.vercel.app/health || exit 1

- name: Rollback if failed
  if: failure()
  run: vercel rollback --token ${{ secrets.VERCEL_TOKEN }}
```

3. **Blue-Green Deployment:** Mantener dos ambientes identicos. Si el nuevo falla, se redirige el trafico al ambiente anterior.

4. **Backups de base de datos:** Antes de cada deploy, respaldar la base de datos para poder restaurarla si es necesario.
