const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
app.use(express.urlencoded({extended: false}));

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

const cors = require('cors');

require('dotenv').config({debug: true})

app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));

app.use(express.static(path.join(__dirname, '../','richardhaskell','images')))
app.use(favicon(path.join(__dirname,'../','richardhaskell','images','favicon.ico')))

let corserror

try{
app.use('/rhbackend/', require('./backend/send-mail.js'))
//FOLLOWING LINE is ONLY NEEDED FOR LOCAL VERSION
app.use('/richardhaskell/', express.static(path.join(__dirname,'../','richardhaskell/')))

app.use('/richardhaskell.dev/', express.static(path.join(__dirname,'../')))
app.get('/richardhaskell.dev/static',(req,res) =>{
    res.sendFile(path.join(__dirname,'../','index.html'))
})

corserror =  process.env.REMOTE_CLIENT_APP

app.use('rhbackend/static', express.static(path.join(__dirname,'./','routes')))
app.get('/rhbackend/contact-form', (req,res) => {
    res.sendFile(path.join(__dirname,'./','routes','contact-form.html'))
})
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

