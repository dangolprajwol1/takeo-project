import { model, Schema } from "mongoose";

const TodosTitleSchema = new Schema({
  title: String,
  completed: Boolean,
  created: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  todos: [{ type: Schema.Types.ObjectId, ref: "todos" }],
});

const TodosTitle = model("todosTitle", TodosTitleSchema);

export default TodosTitle;
