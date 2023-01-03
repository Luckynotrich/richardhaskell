//apnd-file.js
const { appendFile } = require('fs');

 async function apndFile(messFile,mess){
    await appendFile(messFile,mess, (err) => {
      if (err) {
        console.log('appendfile ', err)
        throw err;
  }
   console.log(mess);
  });
  }
  module.exports = apndFile;