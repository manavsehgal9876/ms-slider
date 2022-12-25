const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const slider = document.querySelector('.ms-slider');
const sliderItems = slider.querySelectorAll('.ms-slider-item');
const numberOfSlides = sliderItems.length;
const lastSlide = numberOfSlides - 1;

function resetClasses() {
  sliderItems.forEach(slider => {
    if (!slider.classList.contains('ms-active')) {
      slider.classList.add('d-none');
    }
  });
  sliderItems.forEach(slider => {
    if (!slider.classList.contains('ms-active')) {
      slider.classList.add('d-none');
    }
  });
}

function slideLeft() {
  if (sliderItems[0].classList.contains('ms-active')) {
    for (let i = 0; i < sliderItems.length; i++) {
      let item = sliderItems[i];
      if (item.classList.contains('ms-active') && i === 0) {
        sliderItems[lastSlide].classList.remove('d-none');
        sliderItems[lastSlide].classList.add('ms-active');
        item.classList.add('d-none');
        item.classList.remove('ms-active');
      }
    }
  } else {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('ms-active')) {
        let item = sliderItems[i];
        const itemBeforeTheCurrentItem = sliderItems[i - 1];
        itemBeforeTheCurrentItem.classList.remove('d-none');
        itemBeforeTheCurrentItem.classList.add('ms-active');
        item.classList.add('d-none');
        item.classList.remove('ms-active');
      }
    }
  }
  resetClasses();
}

function slideRight() {
  if (sliderItems[0].classList.contains('ms-active')) {
    for (let i = 0; i < sliderItems.length; i++) {
      let item = sliderItems[i];
      if (item.classList.contains('ms-active') && i === 0) {
        sliderItems[1].classList.add('ms-active');
        sliderItems[1].classList.remove('d-none');
        item.classList.remove('ms-active');
        item.classList.add('d-none');
      }
    }
  } else if (sliderItems[lastSlide].classList.contains('ms-active')) {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('ms-active')) {
        let item = sliderItems[i];
        item.classList.add('d-none');
        item.classList.remove('ms-active');
        sliderItems[0].classList.remove('d-none');
        sliderItems[0].classList.add('ms-active');
        return resetClasses();
      }
    }
  } else {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('ms-active')) {
        let item = sliderItems[i];
        item.classList.add('d-none');
        item.classList.remove('ms-active');
        const itemAfterTheCurrentItem = sliderItems[i + 1];
        itemAfterTheCurrentItem.classList.remove('d-none');
        itemAfterTheCurrentItem.classList.add('ms-active');
        return resetClasses();
      }
    }
  }
}

function slideReset() {
  sliderItems[0].classList.add('ms-active');
  sliderItems[0].classList.remove('d-none');
  for (let i = 1; i < sliderItems.length; i++) {
    sliderItems[i].classList.remove('ms-active');
    sliderItems[i].classList.add('d-none');
  }
}

function autoPlay() {
  if (slider.dataset.msSliderAutoplay === 'true') {
    const time = +slider.dataset.msSliderAutoplayTime;
    if (time > 999 && typeof time === 'number') {
      setInterval(function () { slideRight() }, time);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  sliderItems.forEach(item => {
    if (!item.classList.contains('ms-active')) {
      item.classList.add('d-none');
    }
  });
  autoPlay();
  document.querySelectorAll('.ms-slider-btn').forEach(btns => {
    btns.addEventListener('click', btn => {
      switch (btn.target.dataset.slideTo) {
        case 'left':
          slideLeft();
          break;
        case 'right':
          slideRight();
          break;
        case 'reset':
          slideReset();
          break;
      }
    })
  });

});