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

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id)
    .then((comment)=>{
        console.log(req.params.id);

        if(comment.user == req.user.id){
            let postId=comment.post;
           // comment.remove();
           Comment.deleteOne({_id:req.params.id})
           .then(()=>{
             Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
            .then((post)=>{
               return res.redirect('back');
            })
           })

            
        }
        else{
            return res.redirect('back');
        }
    })
}

