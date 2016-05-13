var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 2000;
var mongoose =require('mongoose');
var bodyParser = require('body-parser');
var dbUrl = 'mongodb://localhost/style';
var Post=require('./app/models/post');
var User=require('./app/models/user');
//var _=require('underscore');
app.locals.moment=require('moment');


//mongoose.connect(dbUrl);
var db = mongoose.connect(dbUrl);
db.connection.on("error",function(err){
    console.log('数据库连接失败'+err)
})
db.connection.on('open',function(){
    console.log('数据库连接成功');
})

app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
if(!module.parent){
    app.listen(port);
}
console.log('style started on port'+port);

//首页
app.get('/',function(req,res){
    Post.fetch(function(err,posts){
        if(err){
            console.log(err)
        }
        res.render('index', {
            title: '首页',
            posts:posts
        })
    })
})
//发帖
app.get('/post',function(req,res){
    res.render('post',
        {
            title: '发帖',
            post:{
                _id:'',
                title:'',
                content:'123',
            }
        }
    );
})
//保存发帖
app.post('/post/new',function(req,res){
    var id = req.body.post._id;
    var postObj = req.body.post;
    var _post;
    _post = new Post({
        title: postObj.title,
        content: postObj.content
    });
    _post.save(function(err, post) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});
//注册
app.post('/user/reg',function (req, res) {
    var _user=req.body.user;
    User.findOne({name:_user.name},function (err,user) {
        if(err){
            console.log(err);
        }
        if (user){
            console.log('用户已存在');
            return res.redirect('/')
        }else{
            var user=new User(_user);
            console.log(_user);
            user.save(function (err,user) {
                if(err){
                    console.log(err);
                }else{
                    console.log(user);
                    return res.redirect('/');
                }
            })
        }
    })
});
//登录
app.post('/user/signin',function (req, res) {
    var _user=req.body.user;
    var name=_user.name;
    var password=_user.password;
    User.findOne({name:_user.name},function (err, user) {
        if(err){
            console.log(err);
        }
        if(!user){
            console.log('用户未注册');
            return res.redirect('/signup');
        }
        user.comparePassword(password,function (err, isMatch) {
            if(err){
                console.log(err);
            }
            if (isMatch){
                //req.session.user=user;
                console.log('login success')
                return res.redirect('/');
            }else{
                return res.redirect('/');
                console.log('password is not match')
            }
        })
    })
})





//var express = require('express');
//var port = process.env.PORT ||6000;
//var mongoose=require('mongoose');
//
//var app = express();
//var path = require('path');
//var bodyParser = require('body-parser');
//var dbUrl='mongodb://localhost/movie';
//var logger = require('morgan');
//app.locals.moment=require('moment');
//
//
//mongoose.connect(dbUrl);
//app.set('views','./app/views/pages');
//app.set('view engine','jade');
//app.use(express.static(path.join(__dirname,'public')));
////app.use(bodyParser.urlencoded({ extended: false }))
//// 表单数据格式化//
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());
//
//
//if(!module.parent){
//    app.listen(port);
//}
//
//console.log('imovie started on port'+port);




