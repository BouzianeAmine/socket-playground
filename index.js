const path = require('path');
const express = require('express');
const cors = require('cors');
const { v4: uuidV4 } = require('uuid');
const app = express();
const PORT = 3030;

app.use(cors({ origin: '*'}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

const server = app.listen(PORT);
const { Server } = require('socket.io');
const io = new Server(server, {
        serveClient: true,
        cors: {
            origin: "*",
        }
    }
);

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room});
});

io.on('connection', (socket) => {
    socket.on('newUser', (data) => {
        socket.username = data;
        socket.broadcast.emit('newOne', `${socket.username} has joined the chat`);
    });
    socket.on('message', (data) => {
        socket.broadcast.emit('message', { data, username: socket.username });
    });
    socket.on('writing', () => {
        socket.broadcast.emit('write', socket.username);
    });
    socket.on('stopWrite', () => {
        socket.broadcast.emit('stopWriting', socket.username);
    });
    socket.on('join', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).local.emit('user-joined', userId);
    });
});
