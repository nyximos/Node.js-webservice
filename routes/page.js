const majors = require('../models/major');
const intros = require('../models/intro');
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag, Major, Intro, Question } = require('../models');
const { default: axios } = require('axios');

const router = express.Router();


router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});


router.get('/mypage', isLoggedIn, (req, res) => {
  res.render('mypage', { title: '마이페이지 - NodeBird' });
  //res.render(뷰, 데이터)
  //views 폴더 기준으로 템플릿 엔진을 찾아서 렌더링함.
  //views/mypage.html을 렌더링함
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/major', (req, res) => {
  res.render('major', { title: '전공 소개 - NodeBird' });
});

router.get('/intro', (req, res) => {
  res.render('introduction', { title: '조원 소개 - NodeBird' });
});

router.get('/mypage', isNotLoggedIn, (req, res) => {
  res.render('mypage', { title: '마이페이지 - NodeBird' });
});

router.get('/questions', (req, res) => {
  res.render('questions', { title: '질의응답 - NodeBird' });
});


router.get('/questions/view', (req, res) => {
  res.render('questions_view', { title: '질의응답_글보기 - NodeBird' });
});

router.get('/questions/write', (req, res) => {
  res.render('questions_write', { title: '질의응답_글쓰기 - NodeBird' });
});

router.get('/questions/edit', (req, res) => {
  res.render('questions_edit', { title: '질의응답_글수정 - NodeBird' });
});

router.post('/major', async(req, res) => {  // 수정된 버전
  try {
    const majors = await Major.findOne({
      where: {
      id: req.body.id,  // 바로 html에서 입력받은 id를 넣어서 조건 검색
      }
     });
    res.send(majors); // res.send로 데이터와 함께 응답을 보냄
  } catch (err) {
    console.error(err);
  }
});



router.post('/intro', async(req,res)=> {
  try{
    const intros = await Intro.findOne({
      where:{
        id:req.body.id,
      }
    });
    res.send(intros);
  }catch(err){
    console.error(err);
  }
});

router.get('/', (req, res, next) => {
    res.render('layout', { title: 'NodeBird',});
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