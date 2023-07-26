const express=require('express');

const commentsController=require('../controllers/comments_controller');
const passport =require('passport');

const router=express.Router();

router.post('/create',passport.checkAuthentication ,commentsController.create);

module.exports =router;