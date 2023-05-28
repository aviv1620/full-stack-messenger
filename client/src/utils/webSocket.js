import { setWebsocketStatus } from '../redux/connectionSlice';
import { updateOrInsertContacts } from "../redux/contactsSlice";

export async function connectToServer(token, progress, store) {
  const dispatch = store.dispatch;

  const ws = new WebSocket(`${process.env.REACT_APP_SERVER_WEBSOCKET_URL}?token=${token}`);
  dispatch(setWebsocketStatus(ws.readyState));

  ws.onmessage = (webSocketMessage) => {
    const messageBody = webSocketMessage.data;       
    const contacts = JSON.parse(messageBody)

    console.info(`reload contacts with ${contacts.users.length} users, ${contacts.conversations.length} conversations and ${contacts.groups.length} groups`)

    dispatch(updateOrInsertContacts(contacts));   
  };

  ws.onclose = (event) => {
    dispatch(setWebsocketStatus(ws.readyState));
    //always try again and again
    connectToServer(token, progress, store);

  };

  ws.onopen = async (event) => {
    dispatch(setWebsocketStatus(ws.readyState));    
  };
}