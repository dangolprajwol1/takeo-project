import { model, Schema } from "mongoose";

const TodosTitleSchema = new Schema({
  title: String,
  completed: Boolean,
  created: { type: Date, default: Date.now },
  expiry: { type: Date, default: +new Date() + 1 * 24 * 60 * 60 * 1000 }, // default expiry after one day
  user: { type: Schema.Types.ObjectId, ref: "users" },
  todos: [{ type: Schema.Types.ObjectId, ref: "todos" }],
});

// TodosTitleSchema.virtual("todochildren", {
//   ref: "todos",
//   localField: "_id",
//   foreignField: "todosTitle",
//   justOne: false, // set true for one-to-one relationship
// });

const TodosTitle = model("todosTitle", TodosTitleSchema);

export default TodosTitle;
