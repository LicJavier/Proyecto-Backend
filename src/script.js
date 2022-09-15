//----------------------------------------------------------------------------------------------
//------------------------------MANEJO DE SOCKET----------------------------------------------------
//----------------------------------------------------------------------------------------------
const socket = io();

socket.on('from server msj', mensajes=> render(mensajes));

function render(mensajes) {
    const cuerpoMensajes = mensajes.map((msj)=>{
        return `<span><b>${msj.author}: </b><span>${msj.mensaje}</span></span>`
    }).join('<br>');
    document.querySelector('#historial').innerHTML = cuerpoMensajes;
}
const enviar = document.querySelector("#enviar");
enviar.addEventListener('click', enviarMensaje);

function enviarMensaje() {
    const inputUser = document.querySelector('#user');
    const inputContenido = document.querySelector('#contenidoMensaje');
    console.log(inputContenido)
    const mensaje={
        author: inputUser.value,
        mensaje: inputContenido.value,
    }
    socket.emit('from-cliente-msj', mensaje)
}