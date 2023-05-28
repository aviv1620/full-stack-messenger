import { useState } from "react";
import { requestAddMessageConversations, requestAddMessageGroup, useProgress } from "../../../hooks/progress";
import { useSelector } from "react-redux";
import { finedPreview, isBlockedById } from "../../../redux/contactsSlice";

export function Sender() {

  const [msg, setMsg] = useState("")
  const progress = useProgress('ADD_MESSAGE')
  const contact = useSelector(state => finedPreview(state))
  const isBlocked = useSelector((state) => isBlockedById(state, contact?.uid))

  if (!contact) {
    return ''
  }

  const handleBtnSend = () => {

    if (contact.isGroup) {
      const properties = { groupID: contact.gid, content: msg }
      progress(requestAddMessageGroup, properties)

    } else {
      const properties = { userDestinationID: contact.uid, content: msg }
      progress(requestAddMessageConversations, properties)

    }

    setMsg('')
  }

  const enabled = msg.length > 0 && !isBlocked

  const btnStyleEnabled = `flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6`
  const btnStyleDisabled = `flex flex-shrink-0 focus:outline-none mx-2 block text-gray-600 hover:text-gray-700 w-6 h-6`

  return <div className="chat-footer flex-none">
    <div className="flex flex-row items-center p-4">
      <div className="relative flex-grow">
        <label>
          <input className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
            type="text" placeholder="Aa" value={msg} onChange={e => setMsg(e.target.value)} />
        </label>
      </div>
      <button type="button" className={enabled ? btnStyleEnabled : btnStyleDisabled} onClick={handleBtnSend} disabled={!enabled}>
        <svg viewBox="0 96 539.76475 455.25917" className="w-full h-full fill-current">
          <path d="m 0.00770581,468.28116 c 0,-45.63794 0.171,-82.97806 0.38008,-82.97806 0.44144,0 232.49894419,-57.50864 237.59868419,-58.88186 1.8772,-0.5054 3.1842,-1.1476 2.9047,-1.4272 -0.2796,-0.2794 -54.50064,-14.34014 -120.4914,-31.24586 L 0.41656581,263.01052 0.20828581,179.50526 5.8105468e-6,96.000002 23.513226,105.9594 c 12.93228,5.47768 134.881944,57.04062 270.999284,114.58434 242.48312,102.50994 247.43394,104.64708 244.90634,105.71888 -7.96924,3.3792 -536.0430442,223.71064 -537.5712742,224.29412 l -1.83985999,0.7024 z" />
        </svg>
      </button>
    </div>
  </div>;
}
