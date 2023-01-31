//index.js


/********************************************************************************** */
//********************************************************************************* */
  const form = document.getElementById("contact-form");
  
  const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "block";
    let mail = new FormData(form);
    mail.append('message',message.value)
    sendMail(mail);
     
  });

  sendMail = async (mail) =>{
      // CHANGE TO ADDRESS MATCH VERSION http://localhost:8080/rhbackend/sendEmail
        axios.post('https://www.richardhaskell.dev/rhbackend/sendEmail', 
       // axios.post('http://localhost:8080/rhbackend/sendEmail', 
           mail, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
            .then(res => {
                if (!res.ok) {
                    return null
                }
            })
            .catch((e) => {
                console.log('ERROR ERROR', e, 'ERROR ERROR')
            })
           
}

// window.addEventListener('load', (e)=>{
//   document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "none";

// })
/****************************************************************************************************** */
/******************************************************************************************************* */
// window.showPopup = () => {
// const validName = document.getElementById('name').checkValidity();
    // const validEmail =document.getElementById('email').checkValidity();
    //  if(validName && validEmail ){
      //document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "block";
    //}
//   }
  
  // window.hidePopup = () => {
  //   document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "none";
  // }
  
