![.github/workflows/publish-to-npm.yml](https://github.com/Dellos7/estimated-reading-time/workflows/Test%20and%20NPM%20publish/badge.svg)

# estimated-reading-time

Calculate the estimated reading time of a given text (**plain text** or **HTML**)

## Installation

**Browser**:

```html
<script defer type="text/javascript" src="https://unpkg.com/estimated-reading-time@latest/dist/umd/index.js"></script>
```

**Node**:

```bash
npm i estimated-reading-time
```

## API

### `estimatedReadingTime( text: string, format: TextFormat, options: Options ): Result`

#### Parameters:

| parameter | type | description |
| ------------- | --- | ------------- |
| text  | *`string`*  | The text you want to estimate |
| format  | *`string`* or *`TextFormat`*  | Can be either `html` or `plain_text`. You can also use the exported member `TextFormat` as: `TextFormat.HTML` or `TextFormat.PLAIN_TEXT` |
| options  | *`any`* or *`Options`*  | `{ isTechnical: boolean, wordsPerMinute: number }`. The `isTechnical` param sets the default `250` words per minute to `150`. You can also pass in a custom words per minute metric using the `wordsPerMinute` option. |

#### Result:

| parameter | type | description |
| ------------- | --- | ------------- |
| numWords  | *`number`*  | The number of readable words of the text |
| minutes  | *`number`*  | The estimated minutes it would cost reading the full text |
| seconds  | *`number`*  | The remaining seconds (e.g it would cost `7 minutes` and `31 seconds`) (**this is not the total seconds it would cost, but the remaining from the minutes**) |
| roundedMinutes  | *`number`*  | If it costs more than `x minutes` and `30 seconds` it rounds up to the next minute (e.g `7 minutes and 40 seconds` = `8 minutes`) |

## Usage:

### Browser

```html
<script defer type="text/javascript" src="https://unpkg.com/estimated-reading-time@latest/dist/umd/index.js"></script>
```

Using the package in the browser, all the functions are encapsulated inside the **`EstimatedReadingTime`** global object.


#### Plain text

```javascript
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

```javascript
<script>
  const htmlText = `
    <div class="content">
            <h1>Lorem ipsum</h1>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora placeat eaque dolore reprehenderit error animi veritatis? Corporis animi, sapiente ex voluptate, repudiandae nihil fugit soluta fugiat perferendis consectetur, quae id.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusamus, voluptatibus hic earum quas ea asperiores? Eos nostrum tempora eius impedit, perspiciatis explicabo maxime labore, deserunt ad vel, excepturi repudiandae!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam pariatur, esse nisi nesciunt nam consequatur voluptatem magnam necessitatibus perferendis eius recusandae fugiat, adipisci numquam optio! Distinctio magni dicta ex corrupti.</p>
  `;
  // Here we use EstimatedReadingTime.TextFormat.HTML instead of the string "html"
  const res = EstimatedReadingTime.estimatedReadingTime(htmlText, EstimatedReadingTime.TextFormat.HTML, { isTechnical: true } );
  console.log(res);
</script>
```
`res`:

```json
{
  "numWords": 92,
  "minutes": 0,
  "seconds": 37,
  "roundedMinutes": 1
}
```

If you'd want to get the html directly from any element on the page:

```javascript
// ...
const htmlText = document.querySelector('body').innerHTML;
// ...
```

### Node (CommonJS)

```javascript
const ert = require('estimated-reading-time');

const { estimatedReadingTime, TextFormat } = ert;
const text = `... any text you want to estimate ...`;
const res = estimatedReadingTime( text, TextFormat.PLAIN_TEXT, { isTechnical: false, wordsPerMinute: 300 } );
console.log(res);
```

### Node (ESM)

> Note that in order to use ESM imports your file should have a `.mjs` extension or either the closer `package.json` should be of `type: "module"`. Also note that depending on your Node.js version, you may be required to run the script using the `--experimental-modules` flag.

```javascript
import { estimatedReadingTime, TextFormat } from 'estimated-reading-time';

const text = `... any text you want to estimate ...`;
const res = estimatedReadingTime( text, TextFormat.PLAIN_TEXT, { isTechnical: true } );
console.log(res);
```

### TypeScript

You can also use the package in your `typescript` code!

```typescript
import { estimatedReadingTime, TextFormat, Options } from 'estimated-reading-time';

const text = `... any text ...`;
const options: Options = {
    isTechnical: false,
    wordsPerMinute: 100
};
const res: Result = estimatedReadingTime( text, TextFormat.PLAIN_TEXT, options );
console.log(res);
```

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