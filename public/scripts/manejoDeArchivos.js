//----------------------------------------------------------------------------------------------
//------------------------------MANEJO DE ARCHIVOS----------------------------------------------
//----------------------------------------------------------------------------------------------
const fs = require('fs/promises');

class Mensaje{
    constructor(ruta){
        this.ruta = ruta;
    }
    async getAll(){
        try {
            const objetos = await fs.readFile( this.ruta , 'utf-8' );
            return JSON.parse(objetos);
        } catch (error) {
            console.log(error);
            return [error];   
        }
    };
    async save(object){
        try {
            const guardar = await this.getAll();
            if (guardar.length === 0) {
                await fs.writeFile(this.ruta, JSON.stringify(object, null,2))
            } else {
                let idNuevo; 
            idNuevo === 0 ? idNuevo = 1 : idNuevo = guardar[guardar.length - 1 ].id + 1;
            const objetoNuevo = {id: idNuevo, ...object};
            guardar.push(objetoNuevo);
            await fs.writeFile(this.ruta, JSON.stringify(guardar, null,2))
            return idNuevo;
            }
        } catch (error) {
            return [];
        }
    }
    render(mensajes) {
    const cuerpoMensajes = mensajes.map((msj)=>{
        return `<span><b class="text-blue-600 font-bold" >${msj.author}: </b><span class="text-amber-800">${msj.hora} </span><span class="italic text-green-700">${msj.mensaje}</span></span>`
    }).join('<br>');
    document.querySelector('#historial').innerHTML = cuerpoMensajes;
}
}

module.exports = Mensaje;