// Utilizamos la extensión ".js" para que sea compatible con 'type="module"' en el navegador
import { HelloWorld } from './hello-world.js';
const hi = ( name: string ) => {
    return `Hi ${name}!`;
};
const asyncFn = async() => {
    const prom = (): Promise<string> => {
        return new Promise( (resolve, reeject) => {
            resolve('async promise res!');
        });
    };
    const str = await prom();
    return str;
};
export { HelloWorld, hi, asyncFn };