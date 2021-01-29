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
    strings:["pleców","kolana","biodra","łokcia","szyi"],
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

// Get the current year for the copyright
$('#year').text(new Date().getFullYear());

//smooth scroll
$(document).ready(function() {
  
    var scrollLink = $('.scroll');
    
    // Smooth scrolling
    scrollLink.click(function(e) {
      e.preventDefault();
      let nav=$('#navbar').outerHeight();
      $('body,html').animate({
        scrollTop: $(this.hash).offset().top - nav -20
      }, 700 );
    });
    
    // Active link switching
    $(window).scroll(function() {
      var scrollbarLocation = $(this).scrollTop();
      
      scrollLink.each(function() {
        
        var sectionOffset = $(this.hash).offset().top - 20;
        
        if ( sectionOffset <= scrollbarLocation ) {
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
        }
      })
      
    })
    
  })

  //navbar

  function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    const mediaQuery=window.matchMedia('(max-width: 768px)');
    
    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });

    navLinks.forEach(link=>{
        link.addEventListener("click",()=>{
            if(mediaQuery.matches){
                nav.classList.toggle("nav-active");
                burger.classList.toggle("toggle");
                navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ""
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
                }
            });
            }
            
        });
    })
    
    
}

navSlide();

//contact submission

window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("my-form");
    var status = document.getElementById("status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      status.classList.add("submited");
      status.innerHTML = "Dziękujemy za wiadomość!";
      setTimeout(()=>{
        status.classList.remove("submited")
      },5000);
    }

    function error() {  
      status.classList.add("errorek");  
      status.innerHTML = "Błąd w formularzu!";
      setTimeout(()=>{
        status.classList.remove("errorek")
      },5000);
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }

  //animated-couter
  const counters=document.querySelectorAll('.counter');
  const speed=1000;
  const animatedOptions={
    threshold:0,
    rootMargin:"0px 0px -50px 0px"
};
  
const animatedCounters=new IntersectionObserver(function(
    entries,
    animatedCounters
    ){
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            return;
        }else{
            counters.forEach(counter=>{
                const updateCount=()=>{
                    const target=+counter.getAttribute('data-target');
                    const count=+counter.innerText;
          
                    const inc=target/speed;
          
                    if(count<target){
                        counter.innerText=Math.ceil(count+inc);
                        setTimeout(updateCount,10);
                    }else{
                        count.innerText=target;
                    }
                }
                updateCount();
            });
            appearOnScroll.unobserve(entry.target);
        }
    });
},animatedOptions);

counters.forEach(counter=>{
    animatedCounters.observe(counter);
});