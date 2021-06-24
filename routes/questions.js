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




 module.exports = router;