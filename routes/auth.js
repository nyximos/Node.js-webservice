const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const Question = require('../models/questions');

const router = express.Router();

// POST /auth/join 요청
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password, number, birth, gender, mobile } = req.body;
  //
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
      number,
      birth,
      gender,
      mobile
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


router.post('/questions/write', isLoggedIn, async (req, res, next) => {
  const { title, content } = req.body;
  const { email, nick } = req.user;
  console.log(req.body);
  try {
    await Question.create({
      title,
      content,
      email,
      nick
    });
    return res.redirect('/questions');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


// GET /auth/kakao 요청
router.get('/kakao', passport.authenticate('kakao')); // passport.authenticate('kakao')에서 카카오 로그인 창으로 리다이렉트 합니다.
                                                      // 카카오에 로그인되어 있다면 뜨지 않지만 안되어있다면 로그인창이 뜨게됩니다.

// GET/auth/kakao/callback 요청
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;