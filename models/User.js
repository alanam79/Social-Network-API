const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Username is required!",
      trim: true,
    },
    email: {
      type: String,
      required: "An email is required!",
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        // an array of ID Values
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        // an array of ID Values
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // tell the schema it will use virtuals and getters
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // set id to false because this is a virtual that Mongoose returns (and its not needed here)
    id: false,
  }
);

// get total count of friends - using the virtuals function
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;