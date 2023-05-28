import { configureStore } from '@reduxjs/toolkit'

import contactsSlice from './contactsSlice'
import connectionSlice from './connectionSlice'
import messagesSlice from './messagesSlice'

export default configureStore({
  reducer: { contacts: contactsSlice, connection:connectionSlice , messages:messagesSlice}
})