import { setToken, startProgress, stopProgress } from '../redux/connectionSlice';
import axios, { AxiosError } from "axios";
import { setUserMe } from "../redux/contactsSlice";
import { load  } from '../redux/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UNAUTHORIZED_ERROR = 401

export async function requestUserInfo(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/user`;
  const user = await requestGet(url, context.token);

  context.dispatch(setUserMe(user));
}

export async function requestCreateGroup(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/group`;
  const response = await requestPost(url, context.token,properties);

  if (response !== 'created')
    console.error(`server not created, instead response:${response}`)
}

export async function requestAddMessageConversations(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/conversation/message`

  const response = await requestPost(url, context.token, properties);

  if (response !== 'added') {
    console.error(`server not added, instead response:${response}`)
  }

}

export async function requestAddMessageGroup(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/group/message`

  const response = await requestPost(url, context.token, properties);

  if (response !== 'added') {
    console.error(`server not added, instead response:${response}`)
  }

}

export async function requestBlockUser(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/block`

  const response = await requestPost(url, context.token, properties);

  if (response !== 'blocked') {
    console.error(`server not blocked, instead response:${response}`)
  }

}

export async function requestUnblockUser(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/unblock`

  const response = await requestPost(url, context.token, properties);

  if (response !== 'unblocked') {
    console.error(`server not unblocked, instead response:${response}`)
  }

}

export async function requestMarkAllTriggersDone(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/trigger/done`

  const response = await requestPost(url, context.token);

  if (response !== 'marked') {
    console.error(`server not marked, instead response:${response}`)
  }
}

export async function requestGetConversation(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/conversation/${properties.destinationID}`

  const response = await requestGet(url, context.token);  

  context.dispatch(load(response.messages))

}

export async function requestGetGroup(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/group/${properties.groupID}`

  const response = await requestGet(url, context.token);

  context.dispatch(load(response.messages));

}

export async function requestMarkReadConversation(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/conversation/markread`

  const response = await requestPost(url, context.token, properties);

  if (response !== 'marked') {
    console.error(`server not marked, instead response:${response}`)
  }
}

export async function requestMarkReadGroup(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/group/markread`

  const response = await requestPost(url, context.token, properties);

  if (response !== 'marked') {
    console.error(`server not marked, instead response:${response}`)
  }
}

export async function requestLeaveGroup(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/group/leave`

  const response = await requestPost(url, context.token, properties);

  if(response !== 'left')
    console.error(`server not left the group, instead response:${response}`)
}

export async function requestAddFriendsGroup(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/group/addFriends`

  const response = await requestPost(url, context.token, properties)

  if(response !== 'added')
    console.error(`server not added, instead response:${response}`)
}

export async function requestRemoveFriendsGroup(context, properties) {
  const url = `${process.env.REACT_APP_SERVER_URL}/group/removeFriends`

  const response = await requestPost(url, context.token, properties)

  if(response !== 'removed')
    console.error(`server not removed, instead response:${response}`)
}

async function requestPost(url, token, data) {
  const options = {
    baseURL: url,
    method: 'post',
    headers: { 'x-access-token': token },
    data: data
  };

  const response = await axios(options);

  return response.data;
}


async function requestGet(url, token, params) {
  const options = {
    baseURL: url,
    method: 'get',
    headers: { 'x-access-token': token },
    params: params
  };

  const response = await axios(options);

  return response.data;
}

function navigateError(navigate, msg) {
  navigate(`/error?msg=${msg}`);
}

async function runProgress(context, name, progressFunction, properties) {
  console.log('start Progress ' + name);
  context.dispatch(startProgress(name));

  try {
    await progressFunction(context, properties);
  } catch (error) {
    runProgressCath(error, context);
  }


  console.log('stop Progress ' + name);
  context.dispatch(stopProgress(name));
}

function runProgressCath(error, context) {
  if (!(error instanceof AxiosError)) {
    console.error(error);
    return
  }
 
  if (error.response) {
    // The server responded with a status code outside the range of 2xx    
    runProgressCathResponse(error, context);
    return
  }

  if (error.request) {
    // The request was made but no response was received, typically due to a network error
    navigateError(context.navigate, 'No response received from server. Check your internet connection. if your developer check the server is up and running');
    return
  }

  // Something happened in setting up the request that triggered an error
  console.error('Error:', error.message);
}

function runProgressCathResponse(error, context) {
  //unauthorized typically due to a token expired or invalid.
  //redirect user to login page.
  if (error.response.status === UNAUTHORIZED_ERROR) {
    console.log(`unauthorized error: ${error.response.data}`);

    localStorage.removeItem("token");
    context.dispatch(setToken(null));
    context.navigate('/login');

  } else {
    navigateError(context.navigate, 'Server responded with an error:', error.response.data);
  }
}

export function useProgress(name) {
  const token = useSelector((state) => state.connection.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const context = { token, navigate, dispatch }

  return (request, properties) => {
    runProgress(context, name, request, properties)
    return null
  }


}
