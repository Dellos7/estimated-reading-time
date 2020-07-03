![.github/workflows/publish-to-npm.yml](https://github.com/Dellos7/estimated-reading-time/workflows/Test%20and%20NPM%20publish/badge.svg)

# estimated-reading-time

Calculate the estimated reading time of a given text (plain text or HTML)

## Usage:

### Browser

Using the package in the browser, all the functions are encapsulated inside the **`EstimatedReadingTime`** global object.

#### Plain text

```html
<script defer type="text/javascript" src="https://unpkg.com/estimated-reading-time@latest/dist/umd/index.js"></script>
```

```html
<script>
  const plainText = `En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda....`; // Longer text
  const res = EstimatedReadingTime.estimatedReadingTime(plainText, 'plain_text', { isTechnical: false } );
  console.log(res);
</script>
```

`res`:

```json
{
  numWords: 1876,
  minutes: 7,
  seconds: 31,
  roundedMinutes: 8
}
```

#### HTML

> TODO

### Node (CommonJS)

> TODO

### Node (ESM)

> TODO

### TypeScript

> TODO

- - - 

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