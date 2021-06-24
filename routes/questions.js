const express = require('express');
const Question = require('../models/questions');

const router = express.Router();

router.route('/')
 .get(async (req, res, next) => {
     try {
         const questions = await Question.findAll();
         res.json(questions);
     } catch (err) {
         console.err(err);
         next(err);
     }
 })
 .post(async (req, res, next) => {
     try {
         const question = await Question.create({
            title: req.body.title,
            content: req.body.content,
            nick : req.user.nick,
            email: req.user.email,
         });
         console.log(question);
         return res.redirect('/questions');
     } catch (err) {
         console.error(err);
         next(err);
     }
 });

 router.route('/:id')
    .patch(async (req, res, next) => {
        try {
            const result = await Question.update({
                content: req.body.content,
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
            const result = await Question.destroy({ where: {id : req.params.id } });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });




 module.exports = router;