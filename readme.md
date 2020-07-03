![.github/workflows/publish-to-npm.yml](https://github.com/Dellos7/estimated-reading-time/workflows/Test%20and%20NPM%20publish/badge.svg)

# estimated-reading-time

Calculate the estimated reading time of a given text (plain text or HTML)

## Usage:

> TODO

`package.json`:

```json
{
  "name": "estimated-reading-time",
  "version": "0.0.1",
  "description": "",
  "main": "./dist/cjs/index.js", // Por defecto resolverá al fichero de CommonJS
  "module": "./dist/esm/index.js", // Para módulos de ES utiliza este fichero (utilizado por Webpack)
  "types": "./dist/typings/index.d.ts", // Los tipos están en esta ruta
  "unpkg": "./dist/umd/index.js",
  "exports": { // Exportaciones condicionales
    ".": {
      "require": "./dist/cjs/index.js", // Cuando se utilice el paquete con "require" se utiliza este archivo (CommonJS)
      "import": "./dist/esm/index.js" // Para imports, se utiliza el fichero de ESM
    }
  },
  "type": "module", // Definimos que por defecto el paquete es un módulo de ESM
  "files": [ // En npm publicaremos solo los archivos de este directorio
    "dist"
  ],
  // ...
```