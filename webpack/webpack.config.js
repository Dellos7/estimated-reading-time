// Plugin de webpack para copiar archivos
const CreateFileWebpack = require('create-file-webpack');

module.exports = (env, argv) => {
    return {
      mode: "development",
      entry: {
        index: __dirname + "/../dist/esm/index.js"
      },
      // Crearemos una librería "umd" para que sea compatible en navegadores
      output: {
        path: __dirname + "/../dist/umd", // La colocaremos en esta ruta
        filename: "index.js",
        publicPath: "/",
        library: "RollupLib", // Será accesible desde la variable global "RollupLib"
        libraryTarget: "umd",
        globalObject: "this"
      },
      // Transpilamos con babel para mayor compatibilidad
      module: {
        rules: [
          {
            test: /\.t|js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
      // En la ruta "dist/cjs" creamos el fichero "package.json" indicando que es de tipo CommonJS para que
      // funcione correctamente con Node utilizando "require"
      plugins: [
        new CreateFileWebpack({
          path: __dirname + '/../dist/cjs',
          fileName: 'package.json',
          content: `{ "type": "commonjs" }`
        })
      ]
    };
  };