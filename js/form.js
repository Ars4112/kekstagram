import { resetEffect, setStartZoomValue } from './effects.js';

const modalFormElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = modalFormElement.querySelector('.img-upload__cancel');
const inputUploadFileElement = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const imgUploadPreview = modalFormElement.querySelector('.img-upload__preview img');

// -------------------------------------------------------------------------
// modalFormElement.classList.remove('hidden');
// document.body.classList.add('modal-open');
// -------------------------------------------------------------------------

const setUserPhoto = ()=> {
  const file = inputUploadFileElement.files[0];
  const regExp = /jpg|jpeg|png$/i;
  const ss = regExp.test(file.name);
  if(ss) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
};

let pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const INVALIDE_HASHTAG = 'Хештег не валиден';
const HASHTAG_LENGTH = 'Хештег должен быть не больше 5';
const HASHTAG_REAPEAT = 'Хештег не должен повторяться';

const validateHashtag = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return hashtags.every((elem)=> re.test(elem));
};

pristine.addValidator(hashtagInput, validateHashtag, INVALIDE_HASHTAG);

const validateHashtagLength = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return hashtags.length <= 5;
};

pristine.addValidator(hashtagInput, validateHashtagLength, HASHTAG_LENGTH);

const validateHashtagRepeat = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(hashtagInput, validateHashtagRepeat, HASHTAG_REAPEAT);

const isEscapeKey = (evt) => evt.key === 'Escape';

function onNotModalKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

hashtagInput.addEventListener('keydown', onNotModalKeyDown);
imageDescription.addEventListener('keydown', onNotModalKeyDown);

const closeModalForm = ()=> {
  pristine.destroy();
  modalFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeModalKeyDown);
  form.reset();
};

function closeModalKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalForm();
  }
}

const openModalForm = ()=> {
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  });

  pristine.addValidator(hashtagInput, validateHashtag, INVALIDE_HASHTAG);
  pristine.addValidator(hashtagInput, validateHashtagLength, HASHTAG_LENGTH);
  pristine.addValidator(hashtagInput, validateHashtagRepeat, HASHTAG_REAPEAT);

  modalFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeModalForm, {onece: true});
  document.addEventListener('keydown', closeModalKeyDown);
  setUserPhoto();
  resetEffect();
  setStartZoomValue();
};

inputUploadFileElement.addEventListener('change', openModalForm);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    form.submit();
  }
});

