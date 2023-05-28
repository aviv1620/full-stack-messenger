import { useSelector } from "react-redux";
import { finedPreview, isBlockedById } from "../../../redux/contactsSlice";
import { requestBlockUser, requestUnblockUser, useProgress } from "../../../hooks/progress";
import { useTimeUpdater } from "../../../hooks/Effects";

export function TopBarUser() {
  const contact = useSelector((state)=>finedPreview(state))
  const {uid, img, name, time } = contact
  const isBlocked = useSelector((state)=>isBlockedById(state,uid))  
  const progressUnlock = useProgress('UNBLOCK_USER')
  const progressBlock = useProgress('BLOCK_USER')
  const timeText = useTimeUpdater(time)

  const handleBtnBlocked = ()=>{    
    if(isBlocked){
      progressUnlock(requestUnblockUser,{uid})      
    }else{
      progressBlock(requestBlockUser,{uid})     
    }
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
        <p className="text-gray-600">last seen {timeText}</p>
      </div>
    </div>

    <div className="flex">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50 h-10" onClick={handleBtnBlocked}>
        {isBlocked ? 'unblock' : 'Block'}
      </button>
    </div>
  </div>;
}
