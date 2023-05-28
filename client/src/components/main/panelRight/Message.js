import React from 'react'
import { MessageMe } from './MessageMe'
import { MessageOther } from './MessageOther'
import { useSelector } from 'react-redux'


export const Message = ({ index }) => {
  const message = useSelector(state => state.messages.values[index])
  const meId = useSelector(state => state.contacts.userMe._id)
  
  if (message.sender === meId)
    return <MessageMe message={message} />
  else
    return <MessageOther message={message} />
}
