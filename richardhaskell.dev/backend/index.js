//index.js


/********************************************************************************** */
//********************************************************************************* */
  const form = document.getElementById("contact-form");
  
  const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = validation();
    document.getElementById('shim').style.display = document.getElementById('msgbx').style.display = "block";
    if(email){
      let mail = new FormData(form);
      mail.append('message',message.value)
      sendMail(mail);
    }
     
  });

  sendMail = async (mail) =>{
    console.log('sendMail')
        axios.post('./sendEmail',
           mail, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
            .then(async (res) => {
                if (res.ok)await form.reset()
                else if(!res.ok) {
                    return null
                }
            })
            .catch((e) => {
                console.log('ERROR ERROR', e, 'ERROR ERROR')
            })
           
}

// Name and Email validation Function.
function validation() {
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;/* /^([w-.]+@([w-]+.)+[w-]{2,4})?$/; */
if (name === '' || email === '') {
return false;
} else if (!(email).match(emailReg)) {
return false;
} else {
return true;
}
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
  
