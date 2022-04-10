const { Schema, model } = require('mongoose');



const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    thoughts: [
      {
        type: Schema.Types.String,
        ref: 'Thoughts'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  }
)

UserSchema.virtual('friendCount').get(function() {
  return this.friends._id.length;
})

const User = model('User', UserSchema);

module.exports = User;