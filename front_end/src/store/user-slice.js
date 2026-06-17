import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    freeEmployees:null,
}

export const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setFreeEmployees : (state,action) =>
        {
            state.freeEmployees = action.payload
        }
       
    }
})

export const {setFreeEmployees} = userSlice.actions;
export default userSlice.reducer;