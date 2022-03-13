window.onload = function(){
    slideOne();
    slideTwo();
    slideOneSM();
    slideTwoSM();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

// Dropdown Slider
let sliderOneSM = document.getElementById("sm-slider-1");
let sliderTwoSM = document.getElementById("sm-slider-2");
let displayValOneSM = document.getElementById("sm-range1");
let displayValTwoSM = document.getElementById("sm-range2");
// let minGap = 0;
// let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValueSM = document.getElementById("sm-slider-1").max;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}
// Small filter functions
function slideOneSM(){
    if(parseInt(sliderTwoSM.value) - parseInt(sliderOneSM.value) <= minGap){
        sliderOneSM.value = parseInt(sliderTwoSM.value) - minGap;
    }
    displayValOneSM.textContent = sliderOneSM.value;
    fillColor();
}
function slideTwoSM(){
    if(parseInt(sliderTwoSM.value) - parseInt(sliderOneSM.value) <= minGap){
        sliderTwoSM.value = parseInt(sliderOneSM.value) + minGap;
    }
    displayValTwoSM.textContent = sliderTwo.value;
    fillColorSM();
}
function fillColorSM(){
    percent1 = (sliderOneSM.value / sliderMaxValue) * 100;
    percent2 = (sliderTwoSM.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}