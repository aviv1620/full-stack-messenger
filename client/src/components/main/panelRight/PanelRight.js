import { Messages } from "./Messages";
import { Sender } from "./Sender";
import { TopBar } from "./TopBar";


export function PanelRight() {
  return <section className="flex flex-col flex-auto border-l border-gray-800">
    <TopBar/>
    <Messages/>
    <Sender/>
  </section>;
}

