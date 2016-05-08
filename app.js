var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 2000;
var mongoose =require('mongoose');
var bodyParser = require('body-parser');
var dbUrl = 'mongodb://localhost/style';
var Post=require('./app/models/post');
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




