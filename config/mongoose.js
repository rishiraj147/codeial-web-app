//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://0.0.0.0:27017/users')

/*.then(()=> console.log('connected successfully'))
.catch((err)=>{console.error(err);}); */

//acquaire the connection (to check if it is successfull)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});