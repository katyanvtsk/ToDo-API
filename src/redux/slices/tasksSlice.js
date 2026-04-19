// import { createSlice } from "@reduxjs/toolkit";

// const getTasks = () => {
//   const savedTasks = localStorage.getItem("tasks");
//   return savedTasks ? JSON.parse(savedTasks) : [];
// };
// const initialState = {
//   tasks: getTasks(),
// };

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push({
//         id: crypto.randomUUID(),
//         title: action.payload,
//         isDone: false,
//       });
//       localStorage.setItem("tasks", JSON.stringify(state.tasks));
//     },

//     deleteTask: (state, action) => {
//       state.tasks = state.tasks.filter((item) => item.id !== action.payload);
//     },

//     isDoneCheck: (state, action) => {
//       state.tasks = state.tasks.map((item) => {
//         if (item.id === action.payload) {
//           return { ...item, isDone: !item.isDone };
//         }
//         return item;
//       });
//     },

//     editTask: (state, action) => {
//       state.tasks = state.tasks.map((item) => {
//         if (item.id === action.payload.id) {
//           return { ...item, title: action.payload.title };
//         }
//         return item;
//       });
//     },

//     clearTasks: (state) => {
//       state.tasks = state.tasks.filter((item) => !item.isDone);
//     },
//   },
// });

// export const { addTask, deleteTask, isDoneCheck, editTask, clearTasks } =
//   tasksSlice.actions;
// export default tasksSlice.reducer;
