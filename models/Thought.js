const  {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true, 
      max: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now

    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max: 280
    },
    created_at: {
      type: Date,
      default: Date.now

    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema] 
  }
)

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;