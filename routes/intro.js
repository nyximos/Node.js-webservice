const express = require('express');
const Intro = require('../models/intro');

const router = express.Router();

router.route('/asd')
 .get(async (req, res, next) => {
     try {
         const intros = await Intro.findAll();
         res.json(intros);
     } catch (err) {
         console.err(err);
         next(err);
     }
 })
 .post(async (req, res, next) => {
     try {
         const intro = await Intro.create({
            name: req.body.name,
            birth: req.body.birth,
            task : req.body.task,
         });
         console.log(intro);
         return res.redirect('/intro');
     } catch (err) {
         console.error(err);
         next(err);
     }
 });

 router.route('/asd/:id')
 .patch(async (req, res, next) => {
     try {
         const result = await Intro.update({
             name: req.body.name,
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
         const result = await Intro.destroy({ where: {id : req.params.id } });
         res.json(result);
     } catch (err) {
         console.error(err);
         next(err);
     }
 });

 module.exports = router;