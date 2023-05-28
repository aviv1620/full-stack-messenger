
import { useSelector } from 'react-redux';
import { finedByUserId } from '../../../redux/contactsSlice'
import { useTimeUpdater } from '../../../hooks/Effects';

export function MessageOther({message}) {   
  const { sender, content, sendTime } = message

  const name = useSelector(state=>finedByUserId(state,sender).name)
  const timeText = useTimeUpdater(sendTime)
  
  return <div className="flex items-center group">
    <div className="px-6 py-3 rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200 my-2">
      <p className="text-left  text-sm text-blue-500">{name}</p>
      <p>{content}</p>
      <p className="text-right  text-sm text-green-400">{timeText}</p>
    </div>
  </div>;
}
