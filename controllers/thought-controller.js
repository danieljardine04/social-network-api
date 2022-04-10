const { Thought, User } = require('../models');

const thoughtController = {

  getThoughts(req, res){ 
    Thought.find({})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })

  },

  addReaction({ params, body}, res){
    console.log(body);
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true}
      )
      .then(dbThoughtData => {
      if(!dbThoughtData){
        res.status(404).json({ message: 'No thought found with this id!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
  
  addThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        {new: true }
      );
    })
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  removeThought({ params }, res){
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deletedThought => {
      if(!deletedThought){
        res.status(404).json({message: "No thought with this Id"});
        return;
      }
      return User.findOneAndUpdate(
        {_id: params.thoughtId },
        { $pull: {thoughts: params.thoughtId } },
        { new: true}
      );
    })
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err))
  }
  
}


module.exports = thoughtController;