const effectSliderContainerElement = document.querySelector('.effect-level');
const effectSliderElement = effectSliderContainerElement.querySelector('.effect-level__slider');
const effectSliderValueElement = effectSliderContainerElement.querySelector('.effect-level__value');
const effectRadioInputArray = document.querySelectorAll('.effects__radio');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const incrementButtonElement = document.querySelector('.scale__control--bigger');
const decrementButtonElement = document.querySelector('.scale__control--smaller');
const sizeImageValueElement = document.querySelector('.scale__control--value');

let START_ZOOM_VALUE = 100;

export const setStartZoomValue = ()=> {
  sizeImageValueElement.value = `${START_ZOOM_VALUE}%`;
  imgUploadPreview.style.tranform = '';
};

incrementButtonElement.addEventListener('click', ()=> {
  if(START_ZOOM_VALUE < 100) {
    START_ZOOM_VALUE+=25;
    sizeImageValueElement.value = `${START_ZOOM_VALUE}%`;
    imgUploadPreview.style.transform = `scale(${START_ZOOM_VALUE / 100})`;
  }
});

decrementButtonElement.addEventListener('click', ()=> {
  if(START_ZOOM_VALUE > 25) {
    START_ZOOM_VALUE-=25;
    sizeImageValueElement.value = `${START_ZOOM_VALUE}%`;
    imgUploadPreview.style.transform = `scale(${START_ZOOM_VALUE / 100})`;
  }
});

const photoEffects = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

export const resetEffect = ()=> {
  effectSliderValueElement.value = '';
  effectSliderContainerElement.classList.add('hidden');
  effectSliderElement.setAttribute('disabled', true);
  imgUploadPreview.style.filter = '';
};

effectRadioInputArray.forEach((i)=> {
  i.addEventListener('click', ()=> {
    imgUploadPreview.className = '';
    if(i.value === 'none') {
      resetEffect();
      return;
    }

    effectSliderContainerElement.classList.remove('hidden');
    effectSliderElement.removeAttribute('disabled', true);
    imgUploadPreview.classList.add(`effects__preview--${i.value}`);
    effectSliderElement.noUiSlider.updateOptions(photoEffects[i.value].options);
    effectSliderElement.noUiSlider.on('update', (values)=> {
      effectSliderValueElement.value = values;
      const {filter, unit} = photoEffects[i.value];
      imgUploadPreview.style.filter = `${filter}(${effectSliderValueElement.value}${unit})`;
    });
  });
});
