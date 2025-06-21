const express = require('express');
const app = express();
const path = require('path');
const apndFile = require('./backend/apnd-file');
const date = require("date-and-time");
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config({ debug: true, encoding: "utf-8" });
const sendMail = require("./backend/send-mail");

app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));

app.use(async (req, res, next) => {
    const now = new Date();
    let idData = date.format(now, "YYYY/MM/DD HH:mm:ss");
    idData = "\n" + idData.toString();
    let reqPath = `${idData} path: ${req.path} \n`; //method:${req.method}
    console.log(reqPath)
    apndFile("console.log", reqPath);
    next();
});

let corserror

try {
    app.use("/rh_backend/sendEmail", sendMail);
    app.use('/rh_backend/', express.static(path.join(__dirname, './')))
    app.use('/rh_backend/richardhaskell/', express.static(path.join(__dirname, './', 'richardhaskell/')))
    app.use('/rh_backend/richardhaskell/', express.static(path.join(__dirname, './', 'backend/')))

    corserror = process.env.REMOTE_CLIENT_APP
    
    app.get(['/','/index'], (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'))
    })

} catch (error) {
    corserror = error;
    throw error
}



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`serving richardhaskell.dev on port(${PORT})`)
})

