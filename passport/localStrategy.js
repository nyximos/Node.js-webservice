const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', // html의 input태그 name속성명, layout.html 
    passwordField: 'password',
  }, async (email, password, done) => { //실제 로그인 로직 실행
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) { // 회원가입한 경우 객체반환 -->true
        const result = await bcrypt.compare(password, exUser.password);
        if (result) { //true : 비번일치
          done(null, exUser); // authenticate의 콜백 호출 ,428페이지
        } else { // false : 비번불일치
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        } // (authError, user, info): (null,exUser,"")
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
