let sliderTrack = document.querySelector('.slider-progress-track');
let sliderThumb = document.querySelector('.slider-progress-thumb');
let sliderValue = document.querySelector('.slider-progress-value');
let sliderCounter = document.querySelector('.slider-counter');
let sliderCounterValues = document.querySelector('.slider-counter-values');

let mouseDown = function(e) {
  document.addEventListener('mouseup', mouseUp);
  document.addEventListener('mousemove', mouseMove);
}

let mouseUp = function(e) {
  document.removeEventListener('mouseup', mouseUp);
  document.removeEventListener('mousemove', mouseMove);
}

let mouseMove = function(e) {
  let sliderTrackRect = sliderTrack.getBoundingClientRect();
  let sliderThumbHalfWidth = sliderThumb.getBoundingClientRect().width / 2;
  let sliderCounterHalfWidth = sliderCounter.getBoundingClientRect().width / 2;
  let value = e.clientX - sliderTrackRect.left;
  let thumbX = value - sliderThumbHalfWidth;
  let counterX = value - sliderCounterHalfWidth;

  if(thumbX >= (sliderThumbHalfWidth * -1) && thumbX <= (sliderTrackRect.width - sliderThumbHalfWidth)) {
    sliderValue.style.width = `${thumbX + sliderThumbHalfWidth}px`;
    sliderThumb.style.transform = `translateX(${thumbX}px)`;
    sliderCounter.style.transform = `translateX(${counterX}px)`;
    
    let valuePercent = (value / sliderTrackRect.width * 100);
console.log(valuePercent)
    sliderCounterValues.style.transform = `translateY(-${valuePercent}%)`;
    
  }
}

sliderThumb.addEventListener('mousedown', mouseDown);