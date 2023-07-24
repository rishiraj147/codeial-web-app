const express=require('express');

const postController=require('../controllers/posts_controller');
const passport =require('passport');

const router=express.Router();

router.post('/create',passport.checkAuthentication ,postController.create);

module.exports =router;