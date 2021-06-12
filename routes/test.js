// 시퀄라이즈 문법 테스트용 파일입니다. 삭제하셔도 됩니다.
const { default: axios } = require('axios');
const { User } = require('../models');
const { Major } = require('../models');

// User.create({
//     email: '2@2',
//     password: 2,
//     nick: '냥냥냥',

// });

// User.update({
//     nick: '수정3',
// }, {
//     where : { id: 2 },
// });

// User.destroy({
//     where: { id: 2},
// });

// const user = User.findOne({});
// console.log(user.nick);

// Major.create({
//     majorName: '전공이름',
//     subtitle1: '전공한줄소개1',
// });


// Major.findAll();

// axios.get('./major', {
//     majorName: '일번',
//     subtitle1: '이번'
// });

// (async () => {
//     try {
//         const result = await axios.get('./major');
//         console.log(result);
//         console.log(result.data);
//     } catch (error) {
//         console.error(error);
//     }
// })();

router.post('/major', async(req, res) => {
    try {
      const majors = await Major.findOne({raw: true });
      const data = [majors.majorName, majors.subtitle1, majors.subtitle2];
      console.log(data);
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  });

  // router.post('/major', async(req,res)=> {

//   await majors.findOne({raw : true}) // 있으면 셀렉트??
//   .then((result) =>{
//     var data = [result.majorName, result.subtitle1,result.subtitle2];
//     console.log(data);
//     res.send(data);
//   })
// });