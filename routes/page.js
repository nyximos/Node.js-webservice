const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('signin', { title: 로그인});
});

router.get('/login/check', (req, res) => {
    res.render('login', { title: 약관동의});
});

router.get('/login/check/signup', (req, res) => {
    res.render('signup', { title: 회원가입});
});

router.get('/login/find', (req, res) => {
    res.render('find', { title: 비밀번호재설정});
});

router.get('/mypage', (req, res) => {
    res.render('mypage', { title: 마이페이지});
});

router.get('/intro', (req, res) => {
    res.render('introduction', { title: 조원소개});
});

router.get('/major', (req, res) => {
    res.render('major', { title: 전공소개});
});

router.get('/major/cp', (req, res) => {
    res.render('major_cp', { title: cp소개});
});

router.get('/major/wd', (req, res) => {
    res.render('major_wd', { title: wd소개});
});

router.get('/major/gc', (req, res) => {
    res.render('major_gc', { title: gc소개});
});

router.get('/questions', (req, res) => {
    res.render('questions', { title: 문의});
});


router.get('/', (req,res,next) => {
    const twits = [];
    res.render('index', {
        title: 'node.js-webservice',
        twits,
    });
});

module.exports = router;