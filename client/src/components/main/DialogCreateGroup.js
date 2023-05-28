import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react'
import { requestCreateGroup, useProgress } from '../../hooks/progress';

export const DialogCreateGroup = ({open,setOpen}) => {
    const [value, setValue] = useState("");
    const progress =  useProgress("CREATE_GROUP")

    const handleClose = () => {
        setOpen(false)
    }

    const handleBtnDone = () => {  
        progress(requestCreateGroup,{name:value})            
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Type the name group
                </DialogContentText>
                <br />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleBtnDone}>Done</Button>
            </DialogActions>
        </Dialog>
    )
}
