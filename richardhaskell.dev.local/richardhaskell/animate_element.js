//animate_element.js

function animateCSS(element,animation,prefix ='animate__'){
    // creates class="animate__animated animate__animation"
    new Promise((resolve, reject) =>{
        const animationName = `${prefix}${animation}`;
        
        const node = document.getElementById(element)

        //sets selected element visible        
        node.style.visibility = 'visible';
        node.classList.add(`${prefix}animated`, animationName);
        
        //When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event){
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }
        node.addEventListener('animationend'. handleAnimationEnd,{once: true})
    }
    )
    
}
//sets all elements with class ="imputLable" hidden
const lables = document.getElementsByClassName('inputLable')
    for(let i = 0;i < lables.length;i++)
        lables[i].style.visibility = "hidden"
    