import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSelector } from "react-redux";
import { finedById, finedByUserId } from "../../redux/contactsSlice";
import { requestAddFriendsGroup, requestRemoveFriendsGroup, useProgress } from "../../hooks/progress";


//action can by ADD,REMOVE or NON
export function DialogGroupMember({groupID,action, setAction}) {  
  const [usersSelected, setUsersSelected] = useState([]);  
  const title = getTitleByAction(action)
  const group = useSelector((state)=>finedById(state,groupID))
  const gid = group.gid
  const usersInGroup = group.members  
  const usersInSystem = useSelector((state)=>state.contacts.usersIds)
  const usersInSystemFormatCombobox = useSelector((state)=> convertUsersListToComboboxList(usersInSystem, state))
  const progressAddFriends = useProgress("ADD_FRIENDS")  
  const progressRemoveFriends = useProgress("REMOVE_FRIENDS")

  const users = useMemo(() => {
    return getListByAction(usersInGroup,usersInSystemFormatCombobox,action)
  }, [usersInGroup,usersInSystemFormatCombobox,action]) 

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") 
        return;
        
    setUsersSelected([])
    setAction("NON")
  }

  const handleDone= () => {
        
    const properties = {
      groupID:gid,
      usersIds:convertComboboxListToUsersList(usersSelected)
    }

    switch (action) {
      case "ADD":
        progressAddFriends(requestAddFriendsGroup,properties)   
        break   

      case "REMOVE":    
        progressRemoveFriends(requestRemoveFriendsGroup,properties)   
        break     

      case "NON":
      default:
        console.error("no action")
        break   
    }
    
    handleClose()
  }

  return (
    <Dialog open={action !== "NON"} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Check the boxes next to the names of the users you want to select.
        </DialogContentText>
        <br />        
        <Autocomplete
          multiple
          options={users}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Checkboxes" placeholder="Users" />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, newValue) => {
            setUsersSelected(newValue);
          }}
          value={usersSelected}
          noOptionsText={getNoOptionsTextByAction(action)}
        />
      </DialogContent> 
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDone}>Done</Button>
      </DialogActions>    
    </Dialog>
  );
}

function getNoOptionsTextByAction(action) {
  switch (action) {
    case "ADD":
      return 'All the users in the system in the group'

    case "REMOVE":
      return "I am the only member in the group"

    default:
      return 'NON'
  }
}

function getTitleByAction(action){
  switch (action) {
    case "ADD":
      return 'Add Users To Group'      
    
    case "REMOVE":
      return 'Remove Users From Group'
  
    default:
      return 'NON'
  }
}

function getListByAction(usersInGroup,usersInSystemFormatCombobox,action){
  
  switch (action) {
    case "ADD":
      return difference(usersInSystemFormatCombobox, usersInGroup)
    
    case "REMOVE":    
      return intersection(usersInSystemFormatCombobox, usersInGroup)
  
    case "NON":
    default:
      return []
  }
}

function difference(usersInSystemFormatCombobox,usersInGroup){
  return usersInSystemFormatCombobox.filter(x => !usersInGroup.includes(x.id));
}

function intersection(usersInSystemFormatCombobox,usersInGroup){  
  return usersInSystemFormatCombobox.filter(x => usersInGroup.includes(x.id));
}

function convertComboboxListToUsersList(users){
  return users.map(u=>u.id)
}

function convertUsersListToComboboxList(usersInSystem, state) {
  return usersInSystem.map(uid => {
    return {
      id: uid,
      title: finedByUserId(state, uid).name
    };
  });
}