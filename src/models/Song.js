import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
  releasedOn: Date,
  audioURL: String,
  coverURL: String,
});

const Song = mongoose.model("Song", songSchema);

export default Song;
