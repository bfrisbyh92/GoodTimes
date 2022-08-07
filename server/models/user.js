import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});
export const User = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
// console.log(User); 
// Trying to break the import seeing what works and what does not
// so I better understand how objects get passed around.
