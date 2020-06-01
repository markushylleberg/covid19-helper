const router = require('express').Router();
const { ref } = require('objection');
const Thread = require('../models/Thread');
const ThreadUserLike = require('../models/ThreadUserLike');
const ThreadUserComment = require('../models/ThreadUserComment');
const userAuth = require('./users');

router.get('/threads/newest', async (req, res) => {
  const user = req.session.userId ? req.session.userId : false;

  const threads = await Thread.query()
    .join('User', 'User.id', '=', 'Thread.user')
    .join('UserCountry', 'UserCountry.id', '=', 'User.country')
    .select([
      'Thread.*',
      'User.first_name',
      'User.last_name',
      'User.country',
      'UserCountry.code',
      ThreadUserLike.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('like_count'),
      ThreadUserComment.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('comment_count'),
    ])
    .orderBy('Thread.created_at', 'desc');

  if (req.session.userId) {
    const likedThreads = await ThreadUserLike.query()
      .select('thread')
      .where('user', '=', req.session.userId);
    return res.send({ response: threads, liked: likedThreads });
  }

  return res.send({ response: threads });
});

router.get('/threads/mostcommented', async (req, res) => {
  const threads = await Thread.query()
    .join('User', 'User.id', '=', 'Thread.user')
    .join('UserCountry', 'UserCountry.id', '=', 'User.country')
    .select([
      'Thread.*',
      'User.first_name',
      'User.last_name',
      'UserCountry.code',
      ThreadUserLike.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('like_count'),
      ThreadUserComment.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('comment_count'),
    ])
    .orderBy('comment_count', 'desc');

  if (req.session.userId) {
    const likedThreads = await ThreadUserLike.query()
      .select('thread')
      .where('user', '=', req.session.userId);
    return res.send({ response: threads, liked: likedThreads });
  }

  return res.send({ response: threads });
});

router.get('/threads/mostliked', async (req, res) => {
  const threads = await Thread.query()
    .join('User', 'User.id', '=', 'Thread.user')
    .join('UserCountry', 'UserCountry.id', '=', 'User.country')
    .select([
      'Thread.*',
      'User.first_name',
      'User.last_name',
      'UserCountry.code',
      ThreadUserLike.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('like_count'),
      ThreadUserComment.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('comment_count'),
    ])
    .orderBy('like_count', 'desc');

  if (req.session.userId) {
    const likedThreads = await ThreadUserLike.query()
      .select('thread')
      .where('user', '=', req.session.userId);
    return res.send({ response: threads, liked: likedThreads });
  }

  return res.send({ response: threads });
});

router.get('/thread/:id', async (req, res) => {
  const thread = await Thread.query()
    .join('User', 'User.id', '=', 'Thread.user')
    .join('UserCountry', 'UserCountry.id', '=', 'User.country')
    .select([
      'Thread.*',
      'User.first_name',
      'User.last_name',
      'UserCountry.code',
      ThreadUserLike.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('like_count'),
      ThreadUserComment.query()
        .where('thread', ref('Thread.id'))
        .count()
        .as('comment_count'),
    ])
    .where('Thread.id', '=', req.params.id);

  const comments = await ThreadUserComment.query()
    .join('User', 'User.id', '=', 'ThreadUserComment.user')
    .join('UserCountry', 'UserCountry.id', '=', 'User.country')
    .select(
      'ThreadUserComment.id',
      'ThreadUserComment.content',
      'ThreadUserComment.created_at',
      'User.first_name',
      'User.last_name',
      'UserCountry.code'
    )
    .where('thread', '=', req.params.id);

  return res.send({ thread, comments });
});

router.get('/threads/liked', userAuth, async (req, res) => {
  const { userId } = req.session;

  const threads = await ThreadUserLike.query()
    .join('Thread', 'Thread.id', '=', 'ThreadUserLike.thread')
    .select('Thread.*', 'ThreadUserLike.created_at as created_at')
    .where('ThreadUserLike.user', '=', userId)
    .orderBy('ThreadUserLike.created_at', 'desc');

  return res.status(200).send({ response: threads });
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

  const alreadyLiked = await ThreadUserLike.query()
    .select()
    .where('thread', '=', threadId)
    .where('user', '=', userId);

  if (alreadyLiked[0]) {
    const alreadyLiked = await ThreadUserLike.query()
      .delete()
      .where('thread', '=', threadId)
      .where('user', '=', userId);
  } else {
    const newLike = await ThreadUserLike.query().insert({
      thread: threadId,
      user: userId,
    });
  }
});

module.exports = router;
