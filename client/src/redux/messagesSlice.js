import { createSlice } from '@reduxjs/toolkit'
  
export const messagesSlice = createSlice({
  name:  'messages',
  initialState: {
    values:null
  },
  reducers: {
    load: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.values = null

      const messages = action.payload  

      messages.forEach(msg => {
        if (!state.values)
          state.values = []

        state.values.push((msg))
      });
    }
  }
})

// Action creators are generated for each case reducer function
export const { load } = messagesSlice.actions

export default messagesSlice.reducer