class Chatroom{
    constructor(room,username){
        this.username=username;
        this.room=room;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        
        const now = new Date();
        const chat ={
            message : message,
            username : this.username,
            room : this.room,
            created_at : firebase.firestore.Timestamp.fromDate(now)
        };

        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback){
       this.unsub = this.chats
        .where('room','==',this.room)  // where and oredrBY are complex queries....where takes 3 args...
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data());
                }
                
            });
        });
    }

    updateName(username){
        this.username=username;
        localStorage.setItem ('username',username);
    }
    updateRoom(room){
        this.room=room;
        console.log("room updated");
        if(this.unsub){
            this.unsub();
        }
    }
}


