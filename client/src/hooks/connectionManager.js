import { requestMarkAllTriggersDone } from "./progress";
import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { finedById } from "../redux/contactsSlice";
import { requestGetConversation, requestGetGroup, useProgress, requestUserInfo, requestMarkReadConversation, requestMarkReadGroup } from "./progress";
import { load } from "../redux/messagesSlice";
import { connectToServer } from '../utils/webSocket';

export function useConnectionManager() {
  useManageLoginAndWebSocket();
  useManageMessages();
  useTriggers();
}

function useTriggers() {
  const triggers = useSelector(state => state.contacts.userMe.triggers);
  const progressTriggersDone = useProgress("MARK_ALL_TRIGGERS_DONE");

  useEffect(() => {
    if (triggers && triggers.length > 0) {    
      progressTriggersDone(requestMarkAllTriggersDone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggers]);

}

function useManageMessages() {
  const preViewId = useSelector(state => state.contacts.previewID);
  const contact = useSelector(state => finedById(state, preViewId));
  const dispatch = useDispatch();
  const progressConversation = useProgress("GET_CONVERSATION");
  const progressGroup = useProgress("GET_GROUP");
  const progressMarkReadConversation = useProgress("CONVERSATION_MARK_READ");
  const progressMarkReadGroup = useProgress("GROUP_MARK_READ");

  useEffect(() => {
    if (!preViewId) {      
      //clean messages
      dispatch(load([]));
    } else if (contact.isConversation) {      
      progressConversation(requestGetConversation, { destinationID: contact.uid });
    } else if (contact.isGroup) {     
      progressGroup(requestGetGroup, { groupID: contact.gid });
    } else {   
      //clean messages
      dispatch(load([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preViewId, contact]);

  useEffect(() => {
    const isUnread = contact?.isUnread;
    if (isUnread) {
      if (contact.isConversation)
        progressMarkReadConversation(requestMarkReadConversation, { destinationID: contact.uid });
      else if (contact.isGroup)
        progressMarkReadGroup(requestMarkReadGroup, { groupID: contact.gid });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);
}
function useManageLoginAndWebSocket() {
  const token = useSelector((state) => state.connection.token);
  const loginSuccessful = useSelector(state => state.contacts.userMe._id);

  const progressContacts = useProgress('GET_CONTACTS');
  const progressUserInfo = useProgress('GET_USER_INFO');

  //in the websocket progress. I want access to data that hold in state tree without refresh all the component. like lastUpdate.
  const store = useStore();

  useEffect(() => {
    if (!loginSuccessful)
      progressUserInfo(requestUserInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [loginSuccessful]);

  useEffect(() => {
    if (loginSuccessful)
      connectToServer(token, progressContacts, store);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, loginSuccessful]);
}
