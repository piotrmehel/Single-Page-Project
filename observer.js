const nav=document.querySelector("nav");
const sectionOne=document.querySelector("#hero");
const faders=document.querySelectorAll(".fade-in");
const sliders=document.querySelectorAll(".slide-in");

const appearOptions={
    threshold:0,
    rootMargin:"0px 0px -250px 0px"
};

const appearOnScroll=new IntersectionObserver(function(
    entries,
    appearOnScroll
){
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            return;
        }else{
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    });
},appearOptions);

faders.forEach(fader=>{
    appearOnScroll.observe(fader);
});

sliders.forEach(slider=>{
    appearOnScroll.observe(slider);
})

const sectionOneOptions={
    rootMargin:"-470px 0px 0px 0px"
};

const sectionOneObserver=new IntersectionObserver(function(
    entries,
    sectionOneObserver
){
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            nav.classList.add("nav-scrolled");
        }else{
            nav.classList.remove("nav-scrolled");
        }
    });
},sectionOneOptions);

sectionOneObserver.observe(sectionOne);

//typing animations

const typed=new Typed(".typing",{
    strings:["Rysy","Tarnice","Łysice"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
});

//sliding thing

const tl=gsap.timeline({defaults:{ease:'power1.out'}});

tl.to('.text',{y:"0%",duration:1,stagger:0.25});
tl.to('.slider',{y:"-100%",duration:1.5,delay:0.5});
tl.to('.intro',{y:'-100%',duration:1},"-=1");

//cookie banner

const cookieContainer=document.querySelector(".cookie-container");
const cookieButton=document.querySelector("#cookie-btn");

cookieButton.addEventListener("click",()=>{
    cookieContainer.classList.remove("active");
    localStorage.setItem("cookiedisp",true);
});

setTimeout(()=>{
    if(!localStorage.getItem("cookiedisp")){
        cookieContainer.classList.add("active");
    }
},7000);
