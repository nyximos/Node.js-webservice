const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 아이디입니다. 노출되지 않아야 하므로 process.env.KAKAO_ID로 설정
                                    // 나중에 아이디 발급받아 .env 파일에 넣을 것
    callbackURL: '/auth/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소
  }, async (accessToken, refreshToken, profile, done) => {  
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({ // 카카오를 통해 회원가입한 사용자 있는지 조회
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) { // 회원가입 했다면 사용자 정보와 함께 done 함수를 호출하고 전략 종료
        done(null, exUser);
      } else {  // 회원가입 안했다면 진행. 카카오에서는 인증 후 callbackURL에 적힌 주소로 accessToken, refreshToken, profile을 보냄
                // profile에 사용자 정보 들어 있음.
                // 이 객체에서 원하는 정보 꺼내와 사용자를 생성한 뒤 done 함수 호출
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account.email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
