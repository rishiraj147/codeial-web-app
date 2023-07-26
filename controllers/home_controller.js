const Post=require('../models/post');

module.exports.home=function(req,res){


    Post.find({})
    .populate('user') 
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    }) 
    .exec()
    .then(posts => {
      return res.render('home', {
        title: 'Codeial | Home',
        posts: posts
      });
    })
    .catch(err => {
      // Handle the error
      console.error(err);
      return res.status(500).send('Internal Server Error');
    });

   /* Post.find({}).populate('users').exec()
    .then((posts)=>{
      
        return res.render('home',{
            title:'Codeial | Home',
            posts:posts
        });
       
    })  */

 /*   Post.find({}).populate('users').exec(function(err,posts){
        return res.render('home',{
            title:'Codeial | Home',
            posts:posts
        });

    })   */


     
}    