const express = require('express');
const Professor = require('../models/professor');
const Major = require('../models/major')

const router = express.Router();

router.route('/pro')
 .get(async (req, res, next) => {
     try {
         const professors = await Professor.findAll();
         res.json(professors);
     } catch (err) {
         console.err(err);
         next(err);
     }
 })
 .post(async (req, res, next) => {
     try {
         const professors = await Professor.create({
            title: req.body.title,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            majorName: req.body.majorName,
            place: req.body.place,
         });
         console.log(professors);
         return res.redirect('/major');
     } catch (err) {
         console.error(err);
         next(err);
     }
 });

 router.route('/:id')
    .patch(async (req, res, next) => {
        try {
            const result = await Professor.update({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                majorName: req.body.majorName,
                place: req.body.place,
            }, {
                where: {id: req.params.id },
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Professor.destroy({ where: {id : req.params.id } });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });
    router.post('/name', async(req, res) => {  // 수정된 버전
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



 module.exports = router;