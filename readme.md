![.github/workflows/publish-to-npm.yml](https://github.com/Dellos7/estimated-reading-time/workflows/Test%20and%20NPM%20publish/badge.svg)

# estimated-reading-time

Calculate the estimated reading time of a given text (**plain text** or **HTML**)

## Installation

```bash
npm i estimated-reading-time
```

## API

### `estimatedReadingTime( text: string, format: TextFormat, options: Options ): Result`

#### Parameters:

| parameter | type | description |
| ------------- | --- | ------------- |
| text  | *string*  | The text you want to estimate |
| format  | *TextFormat* or *string*  | Can be either `html` or `plain_text`. You can also use the exported member `TextFormat` as: `TextFormat.HTML` or `TextFormat.PLAIN_TEXT` |
| options  | *Options* or *any*  | `{ isTechnical: boolean, wordsPerMinute: number }`. The `isTechnical` param sets the default `250` words per minute to `150`. You can also pass in a custom words per minute metric using the `wordsPerMinute` option. |

#### Result:

| parameter | type | description |
| ------------- | --- | ------------- |
| numWords  | *number*  | The number of readable words of the text |
| minutes  | *number*  | The estimated minutes it would cost reading the full text |
| seconds  | *number*  | The remaining seconds (e.g it would cost `7 minutes` and `31 seconds`) (**this is not the total seconds it would cost, but the remaining from the minutes**) |
| roundedMinutes  | *number*  | If it costs more than `x minutes` and `30 seconds` it rounds up to the next minute (e.g `7 minutes and 40 seconds` = `8 minutes`) |

## Usage:

### Browser

Using the package in the browser, all the functions are encapsulated inside the **`EstimatedReadingTime`** global object.

#### Plain text

```html
<script defer type="text/javascript" src="https://unpkg.com/estimated-reading-time@latest/dist/umd/index.js"></script>
```

```html
<script>
  // Suppose longer text
  const plainText = `En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda....`;
  const res = EstimatedReadingTime.estimatedReadingTime(plainText, 'plain_text', { isTechnical: false } );
  console.log(res);
</script>
```

`res`:

```json
{
  "numWords": 1876,
  "minutes": 7,
  "seconds": 31,
  "roundedMinutes": 8
}
```

#### HTML

> TODO

### Node (CommonJS)

> TODO

```javascript
const ert = require('estimated-reading-time');
const { estimatedReadingTime } = ert;
const text = `... any text you want to estimate ...`;
const res = estimatedReadingTime( text, 'plain_text', { isTechnical: false } );
console.log(res);
```

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