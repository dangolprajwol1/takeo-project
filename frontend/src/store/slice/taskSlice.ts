import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBase from "../../services/axiosBase";
import {
  CompleteTaskData,
  EditTaskData,
  TaskData,
  TodoData,
} from "../../services/taskTypes";

export const CreateTask = createAsyncThunk(
  "task/CreateTask",
  async (input: TaskData) => {
    const data = await axiosBase.post("api/v1/todo/addTodo", input);

    return data.data;
  }
);
export const EditTask = createAsyncThunk(
  "task/EditTask",
  async (input: EditTaskData) => {
    const data = await axiosBase.patch(
      `api/v1/todo/updateTodo/${input.taskId}`,
      input
    );

    return data.data;
  }
);
export const CompleteTask = createAsyncThunk(
  "task/CompleteTask",
  async (input: CompleteTaskData) => {
    const data = await axiosBase.patch(
      `api/v1/todo/updateTodo/${input.taskId}`,
      input
    );
    // console.log(data);
    return data.data;
  }
);
export const AddTodoToTask = createAsyncThunk(
  "task/AddTodoToTask",
  async (input: TodoData) => {
    const data = await axiosBase.post("api/v1/todo/addTodo/task", input);

    return data.data;
  }
);
export const GetTask = createAsyncThunk(
  "task/GetTask",
  async (userId: string) => {
    const data = await axiosBase.get(`api/v1/todo/getTodoUser/${userId}`);

    return data.data;
  }
);
interface TaskType {
  userTasks: string[];
  loading: boolean;
}
const emptyState: TaskType = {
  userTasks: [],
  loading: false,
};
const TaskSlice = createSlice({
  name: "task",
  initialState: emptyState,
  reducers: {
    EmptyTask(state) {
      return emptyState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(CreateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CreateTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(EditTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(EditTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(CompleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(CompleteTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CompleteTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTask.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = action.payload;
      })
      .addCase(GetTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AddTodoToTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddTodoToTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddTodoToTask.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { EmptyTask } = TaskSlice.actions;
export default TaskSlice;
