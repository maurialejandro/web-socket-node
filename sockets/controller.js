const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => {

    socket.emit('last-ticket', ticketControl.ultimo );
    socket.emit('estado-actual', ticketControl.ultimos4 );
    socket.emit('pendientes', ticketControl.tickets.length);
    
    socket.on('next-ticket', ( ticket, callback ) => {
        const next = ticketControl.next();
        socket.broadcast.emit('pendientes', ticketControl.tickets.length);
        callback(next)
        // Notificar 
    });
    
    
    socket.on('atender-ticket', ({ escritorio }, callback) => {
        
        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        
        const ticket = ticketControl.atenderTicket( escritorio );
        // TODO: Notificar los ultimos 4
        socket.emit('pendientes', ticketControl.tickets.length);
    
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        
        // TODO: Mostrar la cola de tickets restantes
    
        socket.broadcast.emit('pendientes', ticketControl.tickets.length);
        
        if ( !ticket ){
            callback({
                ok: false,
                msg: 'Ya no hay ticket pendientes'
            })
        } else {
            
            callback({
                ok: true,
                ticket
            })
        }
    })

    socket.on('disconnect', () => {
        console.log("desconectado");
    })
}

module.exports = {
    socketController
}
