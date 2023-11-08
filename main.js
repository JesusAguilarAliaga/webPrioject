//menu indicator slide
const titleNav = document.querySelectorAll('.titleNav');
const menu = document.getElementById('nav');
const indicator = document.getElementById('indicator');
const sections = document.querySelectorAll('.seccion');

let sizeIndicator = menu.querySelector('li').offsetWidth;

indicator.style.width = sizeIndicator + 'px';
let activeSection;

const observer = new IntersectionObserver((entry, observer) => {
    entry.forEach(enter => {
        if (enter.isIntersecting) {
            activeSection = [...sections].indexOf(enter.target);
            indicator.style.transform = `translateX(${sizeIndicator * activeSection}px)`;
            titleNav[activeSection].classList.add('active');
        }
        
        for(let i = 0; i < titleNav.length; i++){
            if(i !== activeSection){
                titleNav[i].classList.remove('active');
            }
            

        }
    });
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: .8
    }
);

sections.forEach(section => observer.observe(section));

const onResize = () => {
    sizeIndicator = menu.querySelector('li').offsetWidth;
    indicator.style.width = sizeIndicator + 'px';
    indicator.style.transform = `translateX(${sizeIndicator * activeSection}px)`;
}

window.addEventListener( 'resize', onResize);

//animation cards IntersectionObserver
const cards = document.querySelectorAll('.cardWh, .cardSe, .cardPr, .skills');

const cardAction = (entry, observer) => {
    entry.forEach(enter => {
        if (enter.isIntersecting) {
            enter.target.classList.add('cardEnterAnimation');
        }
        /* else{
            enter.target.classList.remove('cardEnterAnimation');  //optional to remove animation on intersection out
        } */
    });
}

const observadorCard = new IntersectionObserver(cardAction, {
    threshold: 0.7
});

cards.forEach(card => observadorCard.observe(card));


//dark mode toggle
const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;  //trabajando en detectar el dark mode del sistema
const metaTheme = document.querySelector('meta[name="theme-color"]');

const buttonSwitch = document.querySelector(".switch");
const lMode = document.getElementById("imgSun");
const dMode = document.getElementById("imgMoon");

if(!dark){
    metaTheme.setAttribute('content', '#E3E9F0');/* 
    localStorage.setItem('darkMode', 'false'); */
}/* else{                                               //hay un conflicto en la seleccion del tema por el sistema con local storage, buscare una manera que esto se ejecute solo una vez
    metaTheme.setAttribute('content', '#000');
    localStorage.setItem('darkMode', 'true');
} */

buttonSwitch.addEventListener("click", () => {
    lMode.classList.toggle("imgSun");
    dMode.classList.toggle("imgMoon");
    document.body.classList.toggle("dark");
    buttonSwitch.classList.toggle("switchBlack");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("darkMode", "true");
    }else{
        localStorage.setItem("darkMode", "false");
    }
});

if(localStorage.getItem("darkMode") == "true"){
    document.body.classList.add("dark");
    buttonSwitch.classList.add("switchBlack");
    lMode.classList.add("imgSun");
    dMode.classList.remove("imgMoon");
}else{
    document.body.classList.remove("dark");
    buttonSwitch.classList.remove("switchBlack");
    lMode.classList.remove("imgSun");
    dMode.classList.add("imgMoon");
}

//card show more info
const showMore = document.querySelectorAll('.showMore');
const overlay = document.querySelectorAll('.overlay');
const popUp = document.querySelectorAll('.popUp');
const closeWindow = document.querySelectorAll('.closeWindow');

for(let i=0; i<showMore.length; i++){
    showMore[i].addEventListener("click", () => {
        overlay[i].classList.add("open");
        popUp[i].classList.add("open");
    });
}

for(let i=0; i<closeWindow.length; i++){
    closeWindow[i].addEventListener("click", () => {
        overlay[i].classList.remove("open");
        popUp[i].classList.remove("open");
    });
}

for(let i=0; i<overlay.length; i++){
    overlay[i].addEventListener("click", (e) => {
        if(e.target == overlay[i]){
            overlay[i].classList.remove("open");
            popUp[i].classList.remove("open");
        }
    });
}


//menu para móvil

document.querySelector(".barMenu").addEventListener("click", animationBarMenu);

const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const Nav = document.querySelector(".mainNav");
const navClick = document.querySelectorAll(".titleNav");

[...navClick].forEach(click => {
    click.addEventListener("click", function(){
        Nav.classList.toggle("mobileNav");
        line1.classList.toggle("activeLine1");
        line2.classList.toggle("activeLine2");
        line3.classList.toggle("activeLine3");
    });
});

//close menu when push nav
Nav.addEventListener("click", (e) => {
    if(e.target.classList.contains("mobileNav")){
        Nav.classList.remove("mobileNav");
        line1.classList.remove("activeLine1");
        line2.classList.remove("activeLine2");
        line3.classList.remove("activeLine3");
    }
});


function animationBarMenu(){
    line1.classList.toggle("activeLine1");
    line2.classList.toggle("activeLine2");
    line3.classList.toggle("activeLine3");
    Nav.classList.toggle("mobileNav");
}


//Inputs animations
const input = document.querySelectorAll('.inputForm');
const label = document.querySelectorAll('.labelForm');
const imgInput = document.querySelectorAll('.imgInput');
const submit = document.querySelector('.submit');
const spinner = document.querySelector('.spinner');

for(let i = 0; i < input.length; i++){
    input[i].addEventListener("keyup", () => {
        let email = input[i].value;                                 //solo para el email

        if(input[i].value !== ''){                                  //si el input tiene algo escrito se activa el label
            imgInput[i].classList.add('active');
            label[i].classList.add('active');
            if(email.indexOf('@') > 0){                             //comprobamos que el correo tenga un @
                submit.classList.add('active');
            }else{
                submit.classList.remove('active');
            }
        }else{
            label[i].classList.remove('active');
            imgInput[i].classList.remove('active');
        }
    });
    
    
}

submit.addEventListener("click", (e) => {
    submit.style.display = "none";
    spinner.style.display = "block";
    setTimeout(() => {
        submit.style.display = "block";
        spinner.style.display = "none";
    }
    , 7000);

});


//Traducciones
const textarea = document.querySelector('.textarea');
const en = document.querySelector('.en');
const es = document.querySelector('.es');
const textToChange = document.querySelectorAll('[data-section]');

const changeLanguage = async (language) => {
    const response = await fetch(`./language/${language}.json`);
    const data = await response.json();

    for(let i = 0; i < textToChange.length; i++){
        const section = textToChange[i].dataset.section;
        const value = textToChange[i].dataset.value;

        textToChange[i].innerHTML = data[section][value];
    }

}

en.addEventListener("click", (e) => {
    let lang = e.target.dataset.language;
    en.classList.add("active");
    es.classList.add("active");
    submit.value = "Enviar";
    textarea.placeholder = "Mensaje";
    changeLanguage("es");
});

es.addEventListener("click", (e) => {
    let lang = e.target.dataset.language;
    es.classList.remove("active");
    en.classList.remove("active");
    textarea.placeholder = "Message";
    submit.value = "Send";
    changeLanguage("en");
});