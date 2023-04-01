import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
