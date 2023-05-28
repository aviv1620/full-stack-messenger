import { useState } from "react";
import { DialogGroupMember } from "../DialogGroupMember";
import { useSelector } from "react-redux";
import { finedPreview } from "../../../redux/contactsSlice";
import { requestLeaveGroup, useProgress } from "../../../hooks/progress";

export function TopBarGroup() { 
  const contact = useSelector((state)=>finedPreview(state))
  const progressLeave = useProgress("LEAVE")
  const { img, name,gid,members } = contact  
  const [action, setAction] = useState("NON")//ADD,REMOVE,NON

  const membersText = `have ${members.length} members`

  const handleBtnAdd = ()=>{
    setAction('ADD')
  }

  const handleBtnRemove = ()=>{
    setAction('REMOVE')
  }

  const handleBtnLeave = ()=>{
    progressLeave(requestLeaveGroup,{groupID:gid})    
  }

  return <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
    <div className="flex">
      <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
        <img className="shadow-md rounded-full w-full h-full object-cover"
          src={img}
          alt="" />
      </div>
      <div className="text-sm">
        <p className="font-bold">{name}</p>
        <p className="text-gray-600">{membersText}</p>
      </div>
    </div>

    <div className="flex">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded w-50 h-10" onClick={handleBtnAdd}>
        add users
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded w-50 h-10" onClick={handleBtnRemove}>
        remove users
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded w-50 h-10" onClick={handleBtnLeave}>
        leave group
      </button>
    </div>

    <DialogGroupMember groupID={contact.id} action={action} setAction={setAction}/>
  </div>;
}


