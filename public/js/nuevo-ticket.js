// Referencias
const btnCrear = document.querySelector('button');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
     btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});

socket.on('last-ticket', (last) => {
    lblNuevoTicket.innerText = 'Ticket ' + last;
} )

btnCrear.addEventListener( 'click', () => {
   
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});