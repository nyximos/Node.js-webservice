const majors = require('../models/major'); // 데이터베이스 불러오는거 ㅋ
const intros = require('../models/intro');
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag, Major, Intro } = require('../models');
const { default: axios } = require('axios');

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

router.get('/major', (req, res) => {
  res.render('major', { title: '회원가입 - NodeBird' });
});

router.post('/major', async(req, res) => {
  try {
    const num = await req.body.id;
    const majors = await Major.findOne({
      where: {
      id: num,
      }
     });
    const data = [
      majors.majorName, 
      majors.subtitle1, 
      majors.subtitle2, 
      majors.subtitle3, 
      majors.content
    ];
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

router.get('/intro', (req, res) => {
  res.render('introduction', { title: '조원 소개 - NodeBird' });
});

router.post('/major', async(req,res)=> {

  await majors.findOne({raw : true}) // 있으면 셀렉트??
  .then((result) =>{
    var data = [result.majorName, result.subtitle1,result.subtitle2, result.content];
    console.log(data);
    res.send(data);
  })
})

router.post('/intro', async(req,res)=> {
  try{
    const num =await req.body.id;
    const intros = await Intro.findOne({
      where:{
        id:num,
      }
    });
    const data = [
      intros.name,
      intros.birth,
      intros.email,
      intros.task,
      intros.comment,
    ];
    console.log(data);
    res.send(data);
  }catch(err){
    console.error(err);
  }
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