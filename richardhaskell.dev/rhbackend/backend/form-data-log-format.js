//form-data-format.js
const date = require('date-and-time')

module.exports = formDataFormat = (msg) => {
        const now = new Date();
        let idData = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        const strMsg1 =  JSON.stringify(msg)
        const strMsg = '\n'+ strMsg1.replace(/,/g ,'\n') + '\n'+ idData    // => '2015/01/02 23:14:05
        return strMsg;
    }