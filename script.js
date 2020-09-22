let sliderTrack = document.querySelector('.slider-progress-track');
let sliderThumb = document.querySelector('.slider-progress-thumb');
let sliderValue = document.querySelector('.slider-progress-value');
let sliderCounter = document.querySelector('.slider-counter');
let sliderCounterWrapper = document.querySelector('.slider-counter-wrapper');
let sliderCounterValues = document.querySelector('.slider-counter-numbers');

let isSliding = false;
let isThumbHovered = false;

function mouseDown() {
	isSliding = true;
  document.addEventListener('mouseup', mouseUp);
  document.addEventListener('mousemove', mouseMove);
}

function mouseUp() {
	isSliding = false;

	if(!isThumbHovered){
		hideSliderCounter();
	}

  document.removeEventListener('mouseup', mouseUp);
  document.removeEventListener('mousemove', mouseMove);
}

function mouseMove(e) {
	sliderCounter.style.transition = "none";

  let sliderTrackRect = sliderTrack.getBoundingClientRect();
  let sliderThumbHalfWidth = sliderThumb.getBoundingClientRect().width / 2;
  let sliderCounterHalfWidth = sliderCounter.getBoundingClientRect().width / 2;
  let value = e.clientX - sliderTrackRect.left;
  let thumbX = value - sliderThumbHalfWidth;
	let counterX = value - sliderCounterHalfWidth;
	let valuePercent = (value / sliderTrackRect.width) * 100;

  if(value <= sliderTrackRect.width && value >= 0) {
    sliderValue.style.width = `${valuePercent}%`;
    sliderThumb.style.transform = `translateX(${thumbX}px)`;
    sliderCounter.style.transform = `translateX(${counterX}px) translateY(-38px)`;
    
    let sliderCounterValuesRect = sliderCounterValues.getBoundingClientRect();
    let axisY = ((value / sliderTrackRect.width) * sliderCounterValuesRect.height);
    let heightCounterValue = (sliderCounterValuesRect.height / sliderCounterValues.childElementCount);
    let heightHiddenCounter = ((axisY / heightCounterValue) * heightCounterValue / sliderCounterValues.childElementCount);
    let sliderCounterValuesYAxis = axisY - heightHiddenCounter;
    
    sliderCounterValues.style.transform = `translateY(-${sliderCounterValuesYAxis}px)`;
  }
}

function mouseEnter() {
	isThumbHovered = true;
	showSliderCounter();
}

function mouseLeave() {
	isThumbHovered = false;
	if(!isSliding){
		hideSliderCounter();
	}
}

function resizeWindow() {
	sliderCounter.style.transition = "none";

  let sliderTrackRect = sliderTrack.getBoundingClientRect();
  let sliderValueRect = sliderValue.getBoundingClientRect();
  let sliderThumbHalfWidth = sliderThumb.getBoundingClientRect().width / 2;
	let sliderCounterHalfWidth = sliderCounter.getBoundingClientRect().width / 2;
	
  let value = sliderValueRect.width;
  let thumbX = value - sliderThumbHalfWidth;
  let counterX = value - sliderCounterHalfWidth;

  if(value <= sliderTrackRect.width && value >= 0) {
    sliderThumb.style.transform = `translateX(${thumbX}px)`;
    sliderCounter.style.transform = `translateX(${counterX}px) translateY(-38px)`;
    
    let sliderCounterValuesRect = sliderCounterValues.getBoundingClientRect();
    let axisY = ((value / sliderTrackRect.width) * sliderCounterValuesRect.height);
    let heightCounterValue = (sliderCounterValuesRect.height / sliderCounterValues.childElementCount);
    let heightHiddenCounter = ((axisY / heightCounterValue) * heightCounterValue / sliderCounterValues.childElementCount);
    let sliderCounterValuesYAxis = axisY - heightHiddenCounter;
    
		sliderCounterValues.style.transform = `translateY(-${sliderCounterValuesYAxis}px)`;
	}
}

function showSliderCounter() {
	let matrix = getComputedStyle(sliderCounter).transform.split(/(matrix)\((.*)(\))$/)[2].split(",");
	
	sliderCounter.style.transform = `translateX(${matrix[4]}px) translateY(-38px)`;
	sliderCounterWrapper.style.transitionProperty = "transform";
	sliderCounterWrapper.style.transitionDuration = "0.18s";
	sliderCounterWrapper.style.transform = `scale(1)`;
}

function hideSliderCounter() {
	let matrix = getComputedStyle(sliderCounter).transform.split(/(matrix)\((.*)(\))$/)[2].split(",");

	sliderCounter.style.transform = `translateX(${matrix[4]}px) translateY(-38px)`;
	sliderCounterWrapper.style.transitionProperty = "transform";
	sliderCounterWrapper.style.transitionDuration = "0.18s";
	sliderCounterWrapper.style.transform = `scale(0)`;
}


sliderThumb.addEventListener('mousedown', mouseDown);
sliderThumb.addEventListener("mouseenter", mouseEnter);
sliderThumb.addEventListener("mouseleave", mouseLeave);
window.addEventListener("resize", resizeWindow);