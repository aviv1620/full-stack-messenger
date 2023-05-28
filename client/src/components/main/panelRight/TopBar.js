import { useSelector } from "react-redux";
import { TopBarGroup } from "./TopBarGroup";
import { TopBarUser } from "./TopBarUser";
import { finedPreview } from "../../../redux/contactsSlice";

export const TopBar = () => {

    const contact = useSelector((state)=>finedPreview(state))
    if(!contact)
        return ''
    else if(contact.isGroup)
        return <TopBarGroup/>
    else
        return <TopBarUser/>
}
