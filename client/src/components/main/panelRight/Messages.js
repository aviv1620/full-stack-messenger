import { useSelector } from "react-redux";
import { Message } from "./Message";

export function Messages() {

  const messages = useSelector(state => state.messages.values)
  
  if(!messages)
    return <div className="chat-body p-4 flex-1 overflow-y-scroll"/>
    
  return <div className="chat-body p-4 flex-1 overflow-y-scroll">
    {messages.map((message,index)=><Message key={index} index={index}/>)}
  </div>;
}