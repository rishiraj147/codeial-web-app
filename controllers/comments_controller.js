const Comment= require('../models/comment');
const Post= require('../models/post');

module.exports.create = function(req,res){
   // console.log("______-",req.body.post)
   // console.log("______-",req.body.content)
    Post.findById(req.body.post)
    .then((post)=>{
       // console.log("______***",post)
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then((comment)=>{
                post.comments.push(comment);
                post.save();
               return res.redirect('/');
            })
            .catch((err)=>{
                console.log('error in nesting 1');
                return res.status(500).send('Internal Server Error');

            })
        }
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).send('Internal Server Error');
    })

}