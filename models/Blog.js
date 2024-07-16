const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Id is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  comments: [
    {
      userId: {
        type: String
      },
      comment: {
        type: String
      }
    },
  ],

  dateAdded: {
    type: Date,
    default: Date.now,
  },
  
});
module.exports = mongoose.model("Blog", blogSchema);
