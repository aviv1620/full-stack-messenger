import { useConnectionManager } from "../../hooks/connectionManager";
import { PanelLeft } from "./panelLeft/PanelLeft";
import { PanelRight } from "./panelRight/PanelRight";

export function Main() {

  useConnectionManager()

  return (
    <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
      <div className="flex-1 flex flex-col">       
        <main className="flex-grow flex flex-row min-h-0">
          <PanelLeft />
          <PanelRight />
        </main>
      </div>
    </div>
  );
}