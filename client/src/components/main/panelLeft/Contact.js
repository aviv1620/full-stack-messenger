import { useDispatch, useSelector } from "react-redux";
import {finedById, isBlockedById, setPreviewId} from '../../../redux/contactsSlice'

import React from "react";
import { useTimeUpdater } from "../../../hooks/Effects";

function Contact({ id}) {

  const contact = useSelector(state => finedById(state,id))
  const dispatch = useDispatch()
  const { img, name, msgText, lastMessageTime, isUnread, isAvailable ,uid} = contact;  
  const isBlocked = useSelector((state)=>isBlockedById(state,uid))  
  const timeText = useTimeUpdater(lastMessageTime)

  const unreadStyle = isUnread && !isBlocked
  const subTitleA = isBlocked? 'block' : msgText
  const subTitleB = isBlocked? '' : timeText

  const handleClick = () => {
    dispatch(setPreviewId(id))   
  }

  const styleName = unreadStyle ? 'font-bold' : '';

  const styleTitle = unreadStyle ? 'flex items-center text-sm font-bold' : 'flex items-center text-sm text-gray-600';

  return <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative" onClick={handleClick}>
    <div className="w-16 h-16 relative flex flex-shrink-0">
      <img className="shadow-md rounded-full w-full h-full object-cover"
        src={img}
        alt="" />
      {isAvailable ?
        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
          <div className="bg-green-500 rounded-full w-3 h-3"></div>
        </div>
        : ''}
    </div>
    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
      <p className={styleName}>{name}</p>
      <div className={styleTitle}>
        <div className="min-w-0">
          <p className="truncate">{subTitleA}</p>
        </div>
        <p className="ml-2 whitespace-no-wrap">{subTitleB}</p>
      </div>
    </div>
    {unreadStyle ?
      <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
      : ''}

  </div>;
}

export default React.memo(Contact);