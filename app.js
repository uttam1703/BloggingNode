//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose=require("mongoose");
const PORT=process.env.PORT || 3000;



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});


const homeStartingContent = "Creating your first blog is very straightforward, with a simple wizard that guides you through the process of choosing a name and suitable theme. You can leave it there and begin writing posts immediately, but the real fun lies in the more advanced editor, which lets you customize virtually every aspect of your blog’s appearance";
const aboutContent = "This is Free webSite for Just Fun . Enjoy using this Web Site";
const contactContent = "This is Just Practise Web site for Content";

const postScema={
  title:String,
  content:String
};
const NewPost=mongoose.connection.model("NewPost",postScema);







app.get("/",function(req,res){

  NewPost.find({},function(err,result){
    res.render("home",{home:homeStartingContent,posts:result});

  })
  
  
});

app.get("/about",function(req,res){
  res.render("about",{about:aboutContent});
  
});

app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
  
});


app.get("/compose",function(req,res){
  res.render("compose");
  
});
app.post("/compose",function(req,res){
  let titleValue=req.body.newTitle;
  let postValue=req.body.newPost;

  

  const post = new NewPost ({

    title: titleValue,
 
    content: postValue
 
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");

    }
  });
  
  
  
});


app.get("/post/:id",function(req,res){
  

  

  let postId=req.params.id;
  NewPost.findOne({_id:postId},function(err,result){
    let nameTitle=result.title;
    let namePost=result.content;
    res.render("post",{title:nameTitle,post:namePost});

  })
  
  
  
});










app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
