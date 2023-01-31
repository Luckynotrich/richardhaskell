const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
app.use(express.urlencoded({extended: false}));

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

const cors = require('cors');

require('dotenv').config({debug: true})

app.use((req, res, next) => {
    console.log("path:",req.path)
    next() // calling next middleware function or handler
  })

app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));



app.use('/static', express.static('../richardhaskell'));
app.use(express.static(path.join(__dirname,'../','richardhaskell/','dist/')))
app.use(express.static(path.join(__dirname, '../','richardhaskell/','dist/','images/')))

//Facilitates <link rel="stylesheet" href="main.css">
app.use('/richardhaskell.dev/main.css', express.static(path.join(__dirname,'../','richardhaskell','dist','css','main.css')));
app.use(favicon(path.join(__dirname,'../','richardhaskell','dist','images','favicon.ico')))

let corserror

try{

 app.use('/rhbackend/', require('./backend/send-mail.js'))
 



//returning a user requested page requires original url(/richardhaskell.dev/)
app.get('/richardhaskell.dev/contact-form.html', (req,res) => {
    
        console.log('get contact',path.join(__dirname,'../','richardhaskell','contact-form.html'))
        res.sendFile(path.join(__dirname,'../','richardhaskell','contact-form.html'))
    })


app.use('/richardhaskell.dev/', express.static(path.join(__dirname,'../')))


corserror =  process.env.REMOTE_CLIENT_APP

// For invalid routes
app.get('*', (req, res) => {
    res.send(`<body style="background-color: #224162;"> <h1 style="color: white">404! ${req.params[0]} is an invalid URL.</h1> </body>`);
  });

}catch(error){
    corserror =  error;
     }
    app.use('rhbackend/static', express.static('public'))
app.get('/rhbackend',(req,res) =>{
    res.render('index', {title: corserror})
});
//FOLLOWING LINE is ONLY NEEDED FOR LOCAL VERSION
const PORT = process.env.PORT || 8080
//COMMNET OUT 'PORT' FOR HOSTED VERSION
app.listen(PORT)



