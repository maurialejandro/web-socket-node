// Referencias
const lblOnline = document.getElementById('lblOnline');
const lblOffline = document.getElementById('lblOffline');
const btnEnviar = document.querySelector('#btnEnviar');
const txtMensaje = document.querySelector('#txtMensaje');

const socket = io();

socket.on('connect', () => {
    console.log("Conectado");
    lblOffline.style.display = 'none'; 
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log("Desconectado");
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';   
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
});

btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: 'asd123',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', [payload])
})