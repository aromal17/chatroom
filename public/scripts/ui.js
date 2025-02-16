// render new chat templates to the DOM
// clear the list of chats (when the room changes)


class ChatUI {
    constructor(list){
      this.list = list;
    }

    clear(){
      this.list.innerHTML = '';
    }
    
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
             //optional.....used to add "ago"
        );
      const html = `
        <li class="list-group-item">
          <span class="username">${data.username}</span>
          <br><span class="message">${data.message}</span>
          <div class="time">${when}</span>
        </li>
      `;
      this.list.innerHTML += html;
    }
  }