import { asyncThunkCreator, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        //这里接受两个参数，`state`当前状态的复制值，`action` 当前的动作实例
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, () => {
            console.log("icrementAsync.pending")
        })
        builder.addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
            state.value += action.payload
        })
    }
})

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return amount
    } 
)


export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer;