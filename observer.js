const nav=document.querySelector("nav");
const sectionOne=document.querySelector("#hero");
const faders=document.querySelectorAll(".fade-in");

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