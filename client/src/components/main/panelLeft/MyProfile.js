import { useState } from "react";
import { DialogCreateGroup } from "../DialogCreateGroup";
import { Loading } from "./Loading";
import { useSelector } from "react-redux";
import { ConnectionStatus } from "./ConnectionStatus";

export function MyProfile() { 
  const {name, img} = useSelector((state)=>state.contacts.userMe)
  const [openDialog, setOpenDialog] = useState(false);

  return <div className="active-users flex flex-row justify-between items-end p-2 overflow-auto w-0 min-w-full border-solid border-b-2 border-gray-800">
    <div className="text-sm text-center mr-4"><div className="p-1 border-4 border-transparent rounded-full"><div className="w-16 h-16 relative flex flex-shrink-0">
      <img className="shadow-md rounded-full w-full h-full object-cover"
        src={img}
        alt="" />
    </div>

    </div><p>{name}</p></div>
    
    <ConnectionStatus/>    

    <Loading/>
   
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50 h-10" onClick={()=>setOpenDialog(true)}>
      New Group
    </button>

    <DialogCreateGroup open={openDialog} setOpen={setOpenDialog}/>
  </div>;
}