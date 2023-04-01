import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model("User", userSchema);

export default User;
