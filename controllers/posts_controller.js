const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    Post.create({
        content: req.body.content,
        user:req.user._id
    }).then((post)=>{
        return res.redirect('back');
    }).catch((err)=>{
        console.log('error in creating a post'); return ;
    })
}    

module.exports.destroy =function(req,res){
    //console.log(req.params.id);
    Post.findById(req.params.id)
    .then((post)=>{
        //that check say the who deleting the post same user who creating the post
        //.id means coverting the object id into string
        
        if(post.user == req.user.id){
           // console.log(post);
            Post.deleteOne({ _id: req.params.id })
            .then(()=>{
                Comment.deleteMany({post: req.params.id})
            .then(()=>{
                return res.redirect('back');
            })
            .catch((err)=>{
                return res.redirect('back');
            })
            })  
        }
        else{
            return res.redirect('back');
        }
    })
}