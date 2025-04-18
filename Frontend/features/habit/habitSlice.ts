import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitAPI";
import { create } from "domain";


export type Habit = {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  lastUpdate?: string;
  lastDone?: string;
  days: number; 
};

export type HabitState = {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
}; 


export const fetchHabitsThunk = createAsyncThunk("habits/fetchHabits", async () => {
  const habits = await fetchHabits();
  console.log("Fetched habits:", habits); // Verifica los datos aquí
  return habits;
});


const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
   addHabits: (state, action) => {
        state.habits = action.payload;
    },
    addHabit(state, action) {
      state.habits.push(action.payload);
    },
    removeHabit(state, action) {
      state.habits = state.habits.filter((habit) => habit._id !== action.payload);
    },
  },
  extraReducers : (builder) => { 
    builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
      state.habits = action.payload;
    });
  }
});

export const { addHabit, removeHabit, addHabits } = habitSlice.actions;
export default habitSlice.reducer; 