const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/mypage', isLoggedIn, (req, res) => {
  res.render('mypage', { title: '마이페이지 - NodeBird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/major', isNotLoggedIn, (req, res) => {
  res.render('major', { title: '전공소개 - NodeBird' });
});

router.get('/mypage', isNotLoggedIn, (req, res) => {
  res.render('mypage', { title: '마이페이지 - NodeBird' });
});

router.get('/questions', isNotLoggedIn, (req, res) => {
  res.render('questions', { title: '질의응답 - NodeBird' });
});

router.get('/questions/view', isNotLoggedIn, (req, res) => {
  res.render('questions_view', { title: '질의응답_글보기 - NodeBird' });
});

router.get('/questions/write', isNotLoggedIn, (req, res) => {
  res.render('questions_write', { title: '질의응답_글쓰기 - NodeBird' });
});

router.get('/questions/edit', isNotLoggedIn, (req, res) => {
  res.render('questions_edit', { title: '질의응답_글수정 - NodeBird' });
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
