const eventEmitter = require('./emitter');
const io = require("socket.io")(3141);

eventEmitter.on('on_node', () => {

});

io.on('connection', socket => {
    socket.send()
});

