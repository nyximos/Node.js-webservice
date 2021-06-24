const majors = require('../models/major');
const intros = require('../models/intro');
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag, Major, Intro, Question } = require('../models');
const { default: axios } = require('axios');

const router = express.Router();


router.use((req, res, next) => {
  res.locals.question = req.question;
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/', (req, res, next) => {
  const user = [];
  res.render('layout', {
    title: 'NodeBird',
    twist,
  });
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

// index 자료 목록 조회 GET 방식 /question
router.get('/questions', async(req, res) => {
  try{
    const question = await Question.findAll();
    res.render('questions', { question });
  }catch(err){
    console.error(err);
  }
});

// show 하나의 자료 상세히 보여줌 GET방식 /question/:id
router.get('/questions_view/:id', async(req, res) => {
  try{
    const questions = await Question.findOne({
      where: {
        id: req.params.id,  // 바로 question테이블의 id와 라우터에서 요청받은 id가 같은지
      }
    });
    res.send(Questions); // res.send로 데이터와 함께 응답을 보냄
  }catch(err){
    console.error(err);
  }
});

// new 생성폼 보여주기 GET 방식 /question/new
router.get('/questions/write', (req, res) => {
  res.render('questions_write', { title: '질의응답_글쓰기 - NodeBird' });
});

// create 전달받은 자료 실제로 생성 /question
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
    res.json(question);
    return res.redirect('/questions');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});


// edit 수정폼을 보여준다 GET방식 /question/:id
router.get('/questions/edit/:id', (req, res) => {
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

// update 자료 수정 PUT방식 /question/:id
// destroy 자료 삭제 DELETE방식 /question/:id
router.route('/question_view/:id')
    .put(async (req, res, next) => {
      try {
        const question = await Question.update({
          comment: req.body.comment,
        },{
          where: {id: req.params.id},
        });
        req.body.updatedAt=Date.now();
        res.send(question);
        res.json(question);
        res.render('/question/'+req.params.id);
      } catch (err) {
        console.error(err);
        next(err);
      }
    })
    .delete(async (req, res, next) => {
      try {
        const question = await Question.destroy({
          where:{id:req.params.id}
        });
        res.json(question);
        res.render('/question');
      }catch (err) {
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