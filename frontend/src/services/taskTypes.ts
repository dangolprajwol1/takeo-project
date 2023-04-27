export interface UserTasks {
  _id: string;
  title: string;
  completed: boolean;
  expiry: Date;
  user: string;
  todos: [];
  created: string;
  __v: number;
}

export interface TaskData {
  title: string;
  expiry: Date;
  user: string;
}
export interface TodoData {
  description: string;
  todosTitle: string;
}
export interface EditTaskData {
  title: string;
  expiry: Date;
  taskId: string;
}
export interface CompleteTaskData {
  completed: boolean;
  taskId: string;
}

export interface EditTodoData {
  description: string;
  todosTitle: string;
  taskId: string;
}
