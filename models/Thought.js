const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

//Create the thought model for export.
const Thought = model('Thought', thoughtSchema);

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
        moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a'),
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

//Reaction schema.
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Virtual to retrieve the total count of the reactions.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//Export Thought module.
module.exports = Thought;
