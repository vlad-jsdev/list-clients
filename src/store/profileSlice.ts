import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { mockClients } from '../mock/clients'
import { IClient } from '../types/interfaces'

const initialState = mockClients

export const profileSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<IClient>) => {
      state.clients.push(action.payload)
    },
    editClient: (state, action: PayloadAction<IClient>) => {
		state.clients[state.clients.findIndex((el: IClient) => el.id === action.payload.id)] = action.payload;
    },
	delClient: (state, action: PayloadAction<number>) => {
		state.clients = state.clients.filter((el: IClient) => el.id !== action.payload)
    }
  },
})

export const { addClient, editClient, delClient } = profileSlice.actions

export default profileSlice.reducer
