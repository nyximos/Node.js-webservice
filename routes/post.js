const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try { // Sync: 동기, 호출되어 완료되어야 다음 문장 실행
  fs.readdirSync('uploads'); // uploads폴더 있는지 알아봄
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads'); // Uploads 폴더 생성
}

//multer 객체 생성
const upload = multer({ // 옵션 객체
  storage: multer.diskStorage({ // 저장소를 설정
    destination(req, file, cb) { // 목적지, 업로드할 폴더 설정
      cb(null, 'uploads/');
    },
    filename(req, file, cb) { // 업로드할 파일명 설정
      const ext = path.extname(file.originalname);
      // 확장자 때내기
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // 파일명확장자 때고 + 업로드한 날짜+ 확장자
      // 19070.1.1 0시0분0초 경과시간을 정수값으로 나타냄 , Date.now()
      },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 저장용량제한, 5M byte
});

// Post /post/img 요청
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    console.log(req.user);
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    // req.body.content 문자열 사용자가 작성한 글(해시태그 포함)
    // 문자열 match(졍규표현식)
    
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        }),
      );
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
