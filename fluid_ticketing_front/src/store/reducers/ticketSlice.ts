import { createSlice } from "@reduxjs/toolkit";
import { Ticket } from '../../../../server/src/Models/Ticket';

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        ticketsData: null,
        ticketData: null
    } as {
        ticketsData: Ticket[] | null,
        ticketData: Ticket | null
    },
    reducers: {
        setTickets: (state, action) => {
            console.log('setting tickets', action.payload);
            state.ticketsData = action.payload;
        },
        clearTickets: (state) => {
            state.ticketsData = null;
        },
        setTicket: (state, action) => {
            console.log('setting ticket', action.payload);
            state.ticketData = action.payload;
        },
        clearTicket: (state) => {
            state.ticketData = null;
        }
    }
});

export const {setTickets, clearTickets, setTicket, clearTicket} = ticketsSlice.actions;

export default ticketsSlice.reducer;