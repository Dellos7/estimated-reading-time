// Plugin de webpack para copiar archivos
const CreateFileWebpack = require("create-file-webpack");

module.exports = (_, argv) => {
  return [
    {
      mode: "development",
      devtool: argv.mode !== "production" ? "inline-source-map" : "source-map",
      entry: {
        index: __dirname + "/../dist/esm/index.js"
      },
      // Crearemos una librería "umd" para que sea compatible en navegadores
      output: {
        path: __dirname + "/../dist/umd", // La colocaremos en esta ruta
        filename: "index.js",
        publicPath: "/",
        library: "EstimatedReadingTime", // Será accesible desde la variable global "RollupLib"
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
          path: __dirname + "/../dist/cjs",
          fileName: "package.json",
          content: `{ "type": "commonjs" }`
        })
      ]
    },
    // {
    //   mode: "development",
    //   devtool: argv.mode !== "production" ? "inline-source-map" : "source-map",
    //   entry: {
    //     index: __dirname + "/../dist/esm/index.js"
    //   },
    //   // Crearemos una librería "umd" para que sea compatible en navegadores
    //   output: {
    //     path: __dirname + "/../dist/esmbrowser", // La colocaremos en esta ruta
    //     filename: "index.js"
    //   },
    //   resolve: { modules: ['node_modules'] }
    // }
  ];
};