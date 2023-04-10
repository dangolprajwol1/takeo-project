import { model, Schema } from "mongoose";

const TodoSchema = new Schema({
  description: String,
  completed: Boolean,
  created: { type: Date, default: Date.now },
  todosTitle: { type: Schema.Types.ObjectId, ref: "todosTitle" },
});

const Todos = model("todos", TodoSchema);

export default Todos;
