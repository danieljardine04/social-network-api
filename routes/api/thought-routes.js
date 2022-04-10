const router = require('express').Router();
const {
  getThoughts,
  addReaction,
  removeReaction,
  addThought,
  removeThought
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts);

router.route('/:userId').post(addThought);

router
.route('/:userId/:thoughtId')
.post(addReaction)
.delete(removeThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;