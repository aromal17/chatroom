//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');


//adding new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

//updating rooms
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats((data) => {
            chatUI.render(data);
        });
    }
});


//update username
newNameForm.addEventListener('submit' , e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    //updataing name
    chatroom.updateName(newName);
    //reseting form
    newNameForm.reset();
    //setting time out for the form
    updateMssg.innerHTML = `<p>Your name updated to <b>${newName}</b></p>`;
    setTimeout(() => updateMssg.innerText = '',3000); 
});

//check local storage for a name
const username=localStorage.username ? localStorage.username : 'anonymous';

//class instance
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general',username);


//getting chats and render
chatroom.getChats((data) => {
    chatUI.render(data);
});
