const socket = io('ws://127.0.0.1:3030');
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
myPeer.on('connected', id => {
    socket.emit('join', ROOM_ID, id);
    console.log(id);
});
socket.on('user-joined', (userId) => {
    console.log(userId);
});
/*
let writingEmitted = false;
const get = (id) => {
    return document.getElementById(id);
};

const messagesContainer = get('messages');

const form = get('connect');
const messageForm = get('messageForm');

const msg = get('msg');
const sendMessage = get('sendMessage');

msg.oninput = () => {
    socket.emit('writing');
    writingEmitted = true;
};

msg.onfocus = () => {
    socket.emit('writing');
    writingEmitted = true;
};

msg.onblur = () => {
    socket.emit('stopWrite');
    writingEmitted = false;
};

msg.onkeyup = () => {
    writingEmitted = false;
    setTimeout(() => {
        if (writingEmitted) {
            window.clearTimeout(1000);
            return;
        }
        socket.emit('stopWrite');
    }, 1000);
};

sendMessage.onclick = (e) => {
    e.preventDefault();
    const msgValue = msg.value;
    socket.emit('message', msgValue);
    createMessage(msgValue, userNameValue, MessageType.Message);
    msg.value = '';
};

window.onload = () => {
    messageForm.style.display = 'none';
};

const username = get('username');
const submit = get('submit');
let userNameValue;

submit.onclick = (event) => {
    event.preventDefault();
    userNameValue = username.value;
    socket.emit('newUser', userNameValue);
    form.style.display = 'none';
    messageForm.style.display = '';
};

socket.on('message', (data) => {
    const { data: messageText, username: user } = data;
    createMessage(messageText, user, MessageType.Message);
});

socket.on('newOne', (data) => {
    createMessage(data, null, MessageType.NewOne);
});

const createMessage = (value, user = null, messageType = null) => {
    const label = document.createElement('label');
    const message = document.createElement('p');
    const mainMessage = document.createElement('div');
    if (messageType === MessageType.Writing) {
        get('writing').style.display = '';
        get('writing').innerText = value;
        return;
    }
    if (messageType === MessageType.Message) {
        label.innerText = `${user} said :`;
        message.innerText = value;
        mainMessage.appendChild(label);
    } else {
        message.innerText = value;
    } 
    mainMessage.appendChild(message);
    messagesContainer.appendChild(mainMessage);
};

socket.on('write', (user) => {
    createMessage(`${user} is writing...`, null, MessageType.Writing);
});

socket.on('stopWriting', () => {
    get('writing').style.display = 'none';
});

const MessageType = {
    NewOne : 0,
    Message: 1,
    Writing: 3
}
*/
