const { Schema, model } = require("mongoose");
// importing function from utils folder for the timestamp
const dateFormat = require("../utils/dateFormat");

// Reaction -> schema only
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "You must enter a reaction between 1 and 280 characters!",
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: "You must enter a username!",
    },
    createdAt: {
      type: Date,
      //   if no value is provided, this function will execute and provide a timestamp
      default: Date.now,
      // a getter, this takes stored data and modifies/formats upon return, in this case using the dateFormat() function
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      // tell the schema it will use getters
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "You must post a thought between 1 and 280 characters!",
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      //   if no value is provided, this function will execute and provide a timestamp
      default: Date.now,
      // a getter, this takes stored data and modifies/formats upon return, in this case using the dateFormat() function
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: "You must enter a username!",
    },
    // associate replies with comments by nesting into this schema
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      // tell the schema it will use virtuals and getters
      virtuals: true,
      getters: true,
    },
    // set id to false because this is a virtual that Mongoose returns (and its not needed here)
    id: false,
  }
);

// get total count of reactions -using virtuals function
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
