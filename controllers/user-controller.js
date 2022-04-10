const { User } = require('../models');

const userController = {
  
  getAllUsers(req, res) {
    User.find({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
    
  },

  getUserById({params}, res) {
    User.findOne({_id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  createUser({body}, res){
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  },

  updateUser({params, body}, res){
    User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({message: 'No user found with this id!'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  }, 

  addFriend({ params, body }, res) {
    console.log(body);
    User.create(body)
    .then(( { _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },


  deleteUser({params}, res){
    User.findOneAndDelete({ _id: params.id})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));

  },
  
  removeFriend({params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: params.friends.userId },
      { new: true }
    )
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json(dbUserData);
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  }

}

module.exports = userController;