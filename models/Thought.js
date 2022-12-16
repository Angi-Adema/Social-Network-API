const { Schema, Types, model } = require("mongoose");
const moment = require("moment");
const reactionSchema = require('./Reaction')

//Thought schema.
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        moment(createdAtDate).format("MMM DD, YYYY [at] hh:mm a"),
      },
      username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


//Virtual to retrieve the total count of the reactions.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Create the thought model for export.
const Thought = model("Thought", thoughtSchema);

//Export Thought module.
module.exports = Thought;
