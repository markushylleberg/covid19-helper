const router = require('express').Router();
const { ref } = require('objection');
const Thread = require('../models/Thread');
const ThreadUserLike = require('../models/ThreadUserLike');
const ThreadUserPinned = require('../models/ThreadUserPinned');
const ThreadUserComment = require('../models/ThreadUserComment');
const userAuth = require('./users');

router.get('/threads/newest', async (req, res) => {
  const threads = await Thread.query()
    .join('User', 'User.id', '=', 'Thread.user')
    .select([
      'Thread.*',
      'User.first_name',
      'User.last_name',
      ThreadUserLike.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('like_count'),
      ThreadUserPinned.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('pinned_count'),
      ThreadUserComment.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('comment_count'),
    ])
    .orderBy('Thread.created_at', 'desc');

  return res.send({ response: threads });
});

router.get('/threads/mostcommented', async (req, res) => {
  const threads = await Thread.query()
    .join('User', 'User.id', '=', 'Thread.user')
    .select([
      'Thread.*',
      'User.first_name',
      'User.last_name',
      ThreadUserLike.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('like_count'),
      ThreadUserPinned.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('pinned_count'),
      ThreadUserComment.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('comment_count'),
    ])
    .orderBy('comment_count', 'desc');

  return res.send({ response: threads });
});

router.get('/thread/:id', async (req, res) => {
  const thread = await Thread.query()
    .join('User', 'User.id', '=', 'Thread.user')
    .select([
      'Thread.*',
      'User.first_name',
      'User.last_name',
      ThreadUserLike.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('like_count'),
      ThreadUserPinned.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('pinned_count'),
      ThreadUserComment.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('comment_count'),
    ])
    .where('Thread.id', '=', req.params.id);

  const comments = await ThreadUserComment.query()
    .join('User', 'User.id', '=', 'ThreadUserComment.user')
    .select(
      'ThreadUserComment.id',
      'ThreadUserComment.content',
      'ThreadUserComment.created_at',
      'User.first_name',
      'User.last_name'
    )
    .where('thread', '=', req.params.id);

  return res.send({ thread, comments });
});

router.post('/thread', async (req, res) => {
  const { title, body } = req.body;
  const user = req.session.userId ? req.session.userId : false;

  if (user) {
    const newThread = await Thread.query().insert({
      title,
      body,
      user,
    });
  } else {
    const newThread = await Thread.query().insert({
      title,
      body,
    });
  }
  console.log(user);

  return res.status(200).send({ message: 'New thread has been posted.' });
});

router.post('/thread/comment', userAuth, async (req, res) => {
  const { threadId, comment } = req.body;
  const { userId } = req.session;

  const newComment = await ThreadUserComment.query().insert({
    thread: threadId,
    user: userId,
    content: comment,
  });
  return res.status(200).send({ message: 'Comment has been posted.' });
});

router.post('/thread/like', userAuth, async (req, res) => {
  const { threadId } = req.body;
  const { userId } = req.session;

  console.log(threadId);
  console.log(userId);
});

module.exports = router;
