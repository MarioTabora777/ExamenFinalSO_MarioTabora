# Actividad 4: Troubleshooting (3 pts)

## Snippet 1 (1 pt): Error de sintaxis en triggers

**Errores encontrados:**
- Falta `:` despues de `push` (debe ser `push:`)
- Falta `:` despues de `pull_request` (debe ser `pull_request:`)
- Falta `:` despues de `branches` en la seccion de `pull_request` (debe ser `branches:`)

**YAML corregido:**
```yaml
name: CI Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
```

---

## Snippet 2 (1 pt): Referencia incorrecta a secrets

**Error encontrado:**
- La referencia al secret no usa la sintaxis de expresion de GitHub Actions `${{ }}`. Se escribio `secrets.VERCEL_TOKEN` como texto plano en vez de `${{ secrets.VERCEL_TOKEN }}`.

**YAML corregido:**
```yaml
deploy:
  runs-on: ubuntu-latest
  environment: production
  steps:
    - uses: actions/checkout@v4
    - name: Deploy to Vercel
      run: vercel --prod --token $VERCEL_TOKEN
      env:
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Snippet 3 (1 pt): Configuracion de cache y matrix invalida

**Error encontrado:**
- `node-version: 18` es un valor escalar, no una lista/array. La matrix strategy requiere un array para generar multiples combinaciones de ejecucion. Debe ser `node-version: [18, 20]`.

**YAML corregido:**
```yaml
test:
  runs-on: ubuntu-latest
  strategy:
    matrix:
      node-version: [18, 20]
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: npm
    - run: npm ci && npm test
```
