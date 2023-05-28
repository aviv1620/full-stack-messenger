import { useTimeUpdater } from "../../../hooks/Effects";

export function MessageMe({message}) { 
  const { content, sendTime } = message
  const timeText = useTimeUpdater(sendTime)

  return <div className="flex flex-row justify-end">
    <div className="px-6 py-3 rounded-l-full bg-blue-700 max-w-xs lg:max-w-md my-2">
      {content}
      <p className="text-left  text-sm text-green-400">{timeText}</p>
    </div>
  </div>;
}
