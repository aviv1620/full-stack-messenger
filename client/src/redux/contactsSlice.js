import { createSlice } from '@reduxjs/toolkit'
import {uoiContacts,setUserMeUtil} from './contactsSliceUtils';
import { defaultImgUserUrl } from "../utils/defaults";

const initialItems = {
  userMe: { name: 'loading', img: defaultImgUserUrl , blokesList:{}},
  previewID: null,
  usersIds: [],
  ids: [],
  //format: CONVERSATIONS_XXXXXX or GROUP_XXXXXX
  values: {},
}

export const contactsSlice = createSlice({
  
  name: 'contacts',
  initialState: initialItems,
  reducers: {
    setPreviewId:(state, action)=>{state.previewID = action.payload},    
    setUserMe: setUserMeUtil,
    updateOrInsertContacts: uoiContacts,   
  }
})

function finedByUserId(state, uid) {
  return state.contacts.values[`CONVERSATIONS_${uid}`]
}

function isBlockedById(state, uid){
  return state.contacts.userMe.blokesList[uid]
}

function finedById(state, id) {
  return state.contacts.values[id]
}

function finedPreview(state) {
  const id = state.contacts.previewID
  return finedById(state, id)
}

// Action creators are generated for each case reducer function
export const {updateOrInsertContacts, setUserMe, setPreviewId} = contactsSlice.actions
export { finedById, finedPreview ,finedByUserId,isBlockedById}
export default contactsSlice.reducer