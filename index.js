const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const path = require('path');
const cors = require('cors');
const {verifyAuth} = require('./middleware/authentication')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const pool = require('./database/database');
//  for the routes import 
const user = require('./routes/user-routes');
const post = require('./routes/post-routes');
const like = require('./routes/like-routes');
const comment = require('./routes/comment-routes');

const app = express();



app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: 'MXIUuw6u5Ty0Ecih3XCjZ1+0575N2OTu0x9gsOl6pBc=',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));
require('dotenv').config();
// app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/files", express.static(path.join(__dirname, "files")));
//  for swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample API',
      version: '1.0.0',
      description: 'A sample API with Swagger documentation',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





const PORT = 8000;

//  for the routes setup
app.use('/',user);
app.use('/',post);
app.use('/',like);
app.use('/',comment);



// app.get('/',verifyAuth,(req,res) => {
   
//    const userId = req.user.id;
//    const userImage = req.user.profileimage
//    const userName = req.user.name;
    
//     res.render('index',{userId,userImage,userName});
// })



//  signup page
app.get('/signup',(req,res) => {
    res.render('signup');
});

// login page
app.get('/login',(req,res) => {
    res.render('login')
})

// for logout



app.listen(PORT,() => {
    console.log(`Listening on Port ${PORT}`)
})