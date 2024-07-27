function locomotiveScrolltrigger() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};

locomotiveScrolltrigger();


var cursor = document.getElementById("cursor");
var main = document.getElementById("main");
var spantag = document.getElementById("spantag");
var homeVideo = document.getElementById("homeVideo");

main.addEventListener("mousemove", function(details){
    // console.log(details.clientX, details.clientY);
    cursor.style.left = details.clientX + 5 + "px";
    cursor.style.top = details.clientY + 5 + "px";

    // cursor.style.transform = `translate(${details.pageX} + 5 + px, ${details.pageY} + 5 + px) translate(-50%, -50%)`;

    spantag.style.left = details.clientX +1+"px";
    spantag.style.top = details.clientY +1+ "px";
});

homeVideo.addEventListener("mouseenter", function(){
    spantag.style.display = "block";
    cursor.style.display = "none"
});

homeVideo.addEventListener("mouseleave", function(){
    spantag.style.display = "none";
    cursor.style.display = "block"
});





var timeline1 = gsap.timeline({
    scrollTrigger: {
        trigger: `#page1 h1`,
        scroller: `#main`,
        // markers: true,
        scrub: 3,
        start: `top 30%`,
        end: `top 0`
    }
});

timeline1.to(`#page1 h1`, {
    x:-100,
}, "anim");

timeline1.to(`#page1 h2`, {
    x: 100
}, "anim");

timeline1.to(`#page1 video`, {
    width: `98%`
}, "anim");



var timeline2 = gsap.timeline({
    scrollTrigger: {
        trigger: `#page1 h1`,
        scroller: `#main`,
        // markers: true,
        scrub: 3,
        // start: `top -610vh`,
        // end: `top -610vh`
        start: `top -95%`,
        end: `top -95%`
    }
});

timeline2.to(`#main`, {
    backgroundColor: `#fff`
});



var timeline3 = gsap.timeline({
    scrollTrigger: {
        triiger: `#page1 h1`,
        scroller: `#main`,
        scrub: 3,
        start: `top -450%`,
        end: `top -450%`
    }
});

timeline3.to(`#main`, {
    backgroundColor: `#0F0D0D`
});


var boxes = document.querySelectorAll(`.box`);
boxes.forEach(function(elements){
    elements.addEventListener("mouseenter", function() {
        var attribute = elements.getAttribute("data-image");
        cursor.style.width = "240px";
        cursor.style.height = "290px";
        cursor.style.borderRadius = "5px";
        cursor.style.backgroundImage = `url(${attribute})`;
        cursor.style.backgroundColor = `transparent`;
        cursor.style.mixBlendMode = `normal`;
        
    });
    elements.addEventListener("mouseleave", function() {
        cursor.style.width = "13px";
        cursor.style.height = "13px";
        cursor.style.borderRadius = "50%";
        cursor.style.backgroundImage = `none`;
        cursor.style.mixBlendMode = `difference`;
        cursor.style.backgroundColor = `#EDBFFF`;
    });
});