import { useSelector } from "react-redux";
import Contact from "./Contact";

export function Contacts() {  
 
  const ids = useSelector(state => state.contacts.ids)    

  return <div className="contacts p-2 flex-1 overflow-y-scroll">
    {ids.map((id) => <Contact key={id} id={id} />)}
  </div>;
}
