export interface TodoResponse {
  _id: string;
  description: string;
  completed: boolean;
  todosTitle: string;
  created: Date;
  __v: number;
}
export interface TodoTitleResponse {
  _id: string;
  title: string;
  completed: boolean;
  user: string;
  expiry: Date;
  created: Date;
  todos: TodoResponse[];
  __v: number;
}
