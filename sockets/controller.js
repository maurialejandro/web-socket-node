const socketController = ( socket ) => {
    console.log("cliente conectado");

    socket.on('enviar-mensaje', ( payload ) => {
        
        socket.broadcast.emit('enviar-mensaje', payload)
        
    })
    socket.on('disconnect', () => {
        console.log("desconectado");
    })
}

module.exports = {
    socketController
}