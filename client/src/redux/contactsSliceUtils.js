import dayjs from 'dayjs';
import { defaultImgGroupUrl, textNoNewMsg, textCountMsg, defaultImgUserUrl, textNoMsg } from '../utils/defaults';

//uoi - UpdateOrInsert

// Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new immutable state based off those changes
const unixEpoch = dayjs(0).toISOString();

function uoiContacts(state, action) {
  const { users, conversations, groups } = action.payload;

  users.forEach((user) => uoiUser(state, { payload: user }));
  conversations.forEach((conversation) => uoiConversation(state, { payload: conversation }));
  groups.forEach((group) => uoiGroup(state, { payload: group }));

  sort(state);  
}

function uoiGroup(state, action) {
  
  function main(){
    const group = action.payload;
    const meId = state.userMe._id;
  
    const valueID = `GROUP_${group._id}`;
  
    let value = state.values[valueID];
    if (!value) {
      value = insert(state, group._id, valueID);
    }
  
    const readMessagesCount = uoiGroupCountReadMessages(group, meId);
    const unreadMessagesCount = group.length - readMessagesCount;
  
    value.img = group.img ? group.img : defaultImgGroupUrl;
    value.name = group.name;
    value.msgText = unreadMessagesCount === 0 ? textNoNewMsg : textCountMsg(unreadMessagesCount);
    value.time = group.lastUpdateDate;
    value.lastMessageTime = group.lastMessageTime
    value.isUnread = unreadMessagesCount !== 0;
    value.members = group.usersMember;    
  }

  function insert(state, gid, valueID) {
    state.values[valueID] = {
      gid:gid,
      id: valueID,
      time: unixEpoch,
      isGroup: true
    };
  
    state.ids.push(valueID);
    return state.values[valueID];
  }

  function uoiGroupCountReadMessages(group, meId) {

    if (!group.readMessagesCounts)
      return 0;    
  
    const messagesCount = group.readMessagesCounts[meId]
  
    if (!messagesCount)
      return 0;
  
    return messagesCount;
  }

  return main()
}

function uoiConversation(state, action) {
  function main() {            
    const conversation = action.payload;    

    const meId = state.userMe._id;

    //get other id
    const otherID = getOtherId(meId, conversation);
    
    const valueID = `CONVERSATIONS_${otherID}`;

    const value = state.values[valueID];
    if (!value) {
      console.error('conversation call before user set details');
      return;
    }

    const meReadMessagesCount = getMeMessagesCount(meId, conversation)    
    const unreadMessagesCount = conversation.length - meReadMessagesCount;    

    value.msgText = unreadMessagesCount === 0 ? textNoNewMsg : textCountMsg(unreadMessagesCount);
    value.time = conversation.lastUpdateDate;
    value.lastMessageTime = conversation.lastMessageTime
    value.isUnread = unreadMessagesCount !== 0;    
    value.isConversation = true
  }

  function getMeMessagesCount(meId, conversation){    
    if (meId === conversation.userIdFirst) {
      return conversation.ReadMessagesCountFirst ? conversation.ReadMessagesCountFirst : 0;
    }else{
      return conversation.ReadMessagesCountSecond ? conversation.ReadMessagesCountSecond : 0;
    }
  }

  function getOtherId(meId, conversation) {
    if (meId === conversation.userIdFirst) {
      return conversation.userIdSecond;      
    } else {    
      return conversation.userIdFirst;            
    }
  }

  return main()
}

function uoiUser(state, action) {

  function main(){
    const user = action.payload;

    if(user._id === state.userMe._id){
      setUserMeUtil(state, action)      
      return
    }
      
    const valueID = `CONVERSATIONS_${user._id}`;
    let value = state.values[valueID];
  
    if (!value) {
      value = insert(state, user._id, valueID);
    }
        
    value.img = user.img ? user.img : defaultImgUserUrl;
    value.name = user.name;
    value.time = user.lastUpdateDate;
  }

  function insert(state, uid, valueID) {
    state.values[valueID] = {
      uid:uid,
      id: valueID,
      msgText: textNoMsg,
      time: unixEpoch,
      lastMessageTime:unixEpoch
    };
  
    state.usersIds.push(uid)
    state.ids.push(valueID);
    return state.values[valueID];
  }

  return main()
}

function sort(state) {
  state.ids.sort((valueId1, valueId2) => {

    const contact1 = state.values[valueId1]
    const contact2 = state.values[valueId2]

    //blocked user it the end.
    const isC1Blocked = state.userMe.blokesList[contact1.uid] != null
    const isC2Blocked = state.userMe.blokesList[contact2.uid] != null       

    if(isC1Blocked === isC2Blocked)//both blocked or not blocked
      return dayjs(contact2.lastMessageTime).valueOf() - dayjs(contact1.lastMessageTime).valueOf()
    else
      return isC1Blocked ? 1 : -1
  });
}

function setUserMeUtil(state, action) {
  let user = action.payload;
  user.img = user.img ? user.img : defaultImgUserUrl; 
  convertBlokesListToObjFormat(); 
  state.userMe = user;
  user.triggers.forEach(performTrigger); 

  function convertBlokesListToObjFormat() {
    let blokesList = {};
    user.blokesList.forEach(blockedId => {
      blokesList[blockedId] = true;
    });
    user.blokesList = blokesList;
  }

  function deleteGroup(gid){      
    const valueID = `GROUP_${gid}`;  

    if(state.values[valueID] === undefined)
      return

    if(state.previewID === valueID)  
      state.previewID = null

    state.ids = state.ids.filter(id=>id!==valueID)  
    state.values[valueID] = undefined;
  }

  function performTrigger(trigger){
    const {action,parameter} = trigger
    
    switch (action) {
      case "DELETE_GROUP":
        deleteGroup(parameter)
        break;
    
      default:
        console.error(`Unknown action ${action}`)
        break;
    }
  }
}

export {uoiContacts,setUserMeUtil}