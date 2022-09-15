//----------------------------------------------------------------------------------------------
//------------------------------MANEJO DE SOCKET------------------------------------------------
//----------------------------------------------------------------------------------------------
const socket = io();

socket.on('from server msj', mensajes=> render(mensajes));
socket.on('update-producto', ()=> location.reload());

function render(mensajes) {
    const cuerpoMensajes = mensajes.map((msj)=>{
        return `<span><b class="text-blue-600 font-bold" >${msj.author}: </b><span class="text-amber-800">${msj.hora} </span><span class="italic text-green-700">${msj.mensaje}</span></span>`
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
