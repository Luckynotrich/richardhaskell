//file_list_gen.js Generates scss command files for using multiple images 


const { readdir, rm, writeFile} = require('node:fs/promises');
const { isNumberObject } = require('node:util/types');
const apndFile = require('./apnd-file');


async function fileListGen(path/* string, location of the images              */,
                          file/* string, location scss files will be written  */, 
                          size/* string, either the @media screen width or 0 for default */
                          ) {
  let pathParts = path.split('/');
    //dir containing images
    let imageDir = pathParts.pop();
    let imagePath = '../images/' + imageDir;
    let bg_class = '.bg__';
    let background = '{\n'+'background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.01)), url("';
    let bg_end = '");\n';

    let backset = '@include backSet;'+'\n';
    let backSet240='@include backSet240;\n';
    let backSet420='@include backSet420;\n';

    let fileTitle = '//' + imageDir + '\n';
    let screen = `@media screen and ( max-width: ${size}px)\n{\n`
  try {
    writeFile(file,fileTitle,w);
  }
  catch {
    // await rm(file)
    writeFile(file,fileTitle)  
  }

  try {
    const files = await readdir(path);
    files.sort();
  
    const num = parseInt(size);
    let test = (num > 0);
    console.log('num ',num,' ',test);

    /* add @media  */
    if(test)apndFile(file,screen);
    
    for (let i = 0; i < files.length; i++) {
      /* create background command */
      let listFile = bg_class + `${i +1}` + background + imagePath + '/' + files[i] + bg_end;;
      /* add default css settings when size is set to zero */
      if(!test){listFile = listFile + backset;}
      /* add css adjustments for specific size*/
      //if(num === 420){listFile = listFile + backSet240;}
      //if(num === 640){listFile = listFile + backSet420;}
      /* close background */
      listFile = listFile + '}\n';
        apndFile(file, listFile)
    }
    /*close @media                             */
    if(test)apndFile(file,'}')
  } catch (err) {
    console.error(err);
  }
}
fileListGen('./dist/images/banner-images-2300', './dist/scss/_banner-images-2300.scss','0');
fileListGen('./dist/images/banner-images-1600', './dist/scss/_banner-images-1600.scss','1600');
fileListGen('./dist/images/banner-images-1024', './dist/scss/_banner-images-1024.scss','1024');
fileListGen('./dist/images/banner-images-640', './dist/scss/_banner-images-640.scss','640')
fileListGen('./dist/images/banner-images-420', './dist/scss/_banner-images-420.scss','420');
 fileListGen('./dist/images/banner-images-240', './dist/scss/_banner-images-240.scss','320');