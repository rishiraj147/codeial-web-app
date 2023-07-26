const express=require('express');
const cookieParser=require('cookie-parser');
const app= express();
const port=8000;
const db=require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore= require('connect-mongo');
app.use(express.static('assets'));
app.use(expressLayouts);
// Define a layout
app.set('layout', 'layout.ejs');

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

const nodeSass = require('node-sass');
const fs = require('fs');



app.use(express.urlencoded());
app.use(cookieParser());


app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session in the db 
app.use(session({
    name:'codeial',
    //TODO change the secret before deployement in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://0.0.0.0:27017/users',
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok')
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});