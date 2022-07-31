const fs = require('fs/promises');

class Productos{
    constructor(ruta){
        this.ruta = ruta;
    }
    async getAll(){
        //Object[] - Devuelve un array con los objetos presentes en el archivo.
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8' );
            return JSON.parse(objetos);
        } catch (error) {
            console.log(error);
            return [];   
        }
    };
    async save(object){
        //Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try {
            const guardar = await this.getAll();
            let idNuevo; 
            idNuevo === 0 ? idNuevo = 1 : idNuevo = guardar[guardar.length - 1 ].id + 1;
            const objetoNuevo = {id: idNuevo, ...object};
            guardar.push(objetoNuevo);
            await fs.writeFile(this.ruta, JSON.stringify(guardar, null,2))
            return idNuevo;
        } catch (error) {
            return [];
        }
    }
    async getById(Number){
        //Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            const guardar = await this.getAll();
            let nuevoObjeto = guardar.filter( elemento => elemento.id === Number);
            if (nuevoObjeto.length === 0) {
                nuevoObjeto = null;
            }
            return nuevoObjeto;
        } catch (error) {
            return [];
        }
    };
    
    async deleteById(Number){
        //void - Elimina del archivo el objeto con el id buscado.
        try {
            const elementos = await this.getAll();
            const borrarElemento = elementos.findIndex(elemento=> elemento.id === Number);
            borrarElemento == -1
            ? console.log("No se encontro el elemento") 
            : elementos.splice(borrarElemento,1)
            await fs.writeFile(this.ruta, JSON.stringify(elementos, null,2))
            return (`Objeto ${Number} eliminado`)
        } catch (error) {
            
        }
    };
    async deleteAll(){
        // void - Elimina todos los objetos presentes en el archivo.
        try {
            let borrar = [];
            await fs.writeFile(this.ruta, JSON.stringify(borrar, null,1))
            return [];
        } catch (error) {
            return [];
        }
    };

}

// El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
// Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
// Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 

async function init() {
    const productos = new Productos("./DB/productos.txt");
    
    // console.log(await productos.getAll())
    // console.log(await productos.save({"name": "llavero", "price":500}))
    // console.log(await productos.getById(9))
    // console.log(await productos.getById(3))
    // console.log(await productos.deleteAll());
    console.log(await productos.deleteById(3));
}
init();
