import {
  urlArray,
  createCommentsArray,
  getRandomPositiveInteger,
  description,
} from './data.js';

const body = document.body;
const pictureTemplateElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement
  .querySelector('.big-picture__img')
  .querySelector('img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector(
  '.social__comment-count'
);
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const buttonCloseModal = bigPictureElement.querySelector(
  '.big-picture__cancel'
);
const commentsListElements =
  bigPictureElement.querySelector('.social__comments');
const commentitemElement =
  commentsListElements.querySelector('.social__comment');
const moreCommentsButtonElement =
  bigPictureElement.querySelector('.comments-loader');
const inputUserComment = bigPictureElement.querySelector(
  '.social__footer-text'
);
const inputUserCommentButton = bigPictureElement.querySelector(
  '.social__footer-btn'
);
const isEscapeKey = (evt) => evt.key === 'Escape';

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeModalKeyDown);
};

function closeModalKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const showBigPicture = ({ src, comments, likes }) => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureImage.src = src;
  descriptionElement.textContent = description[getRandomPositiveInteger(0, 9)];

  const likesCount = likes;

  const getlikesCount = (evt) => {

    evt.target.classList.toggle('likes-count--active');
    if (evt.target.classList.contains('likes-count--active')) {
      evt.target.textContent = likesCount + 1;
    } else {
      evt.target.textContent = likesCount;
    }
  };

  likesCountElement.addEventListener('click', getlikesCount);

  likesCountElement.textContent = likesCount;

  let ff = 5;
  let showComents;

  const addComments = () => {
    showComents = ff;
    commentsListElements.innerHTML = '';
    comments.slice(0, showComents).forEach(({ avatar, name, message }) => {
      const commentitemClone = commentitemElement.cloneNode(true);
      const commentitemAvatar = commentitemClone.querySelector('img');
      const commentitemMessage = commentitemClone.querySelector('p');
      commentitemAvatar.src = avatar;
      commentitemAvatar.alt = name;
      commentitemMessage.textContent = message;
      commentsListElements.append(commentitemClone);
    });

    if (showComents >= comments.length) {
      moreCommentsButtonElement.classList.add('hidden');
      commentsCountElement.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      moreCommentsButtonElement.classList.remove('hidden');
      commentsCountElement.textContent = `${showComents} из ${comments.length} комментариев`;
    }
  };

  const addMoreComments = () => {
    showComents = ff += 5;
    addComments();
  };

  const addUserComment = ()=> {
    if (inputUserComment.value !== '') {
      const userMessage = {
        id: getRandomPositiveInteger(0, 200),
        avatar: 'img/avatar-6.svg',
        message: inputUserComment.value,
        name: name,
      };
      comments.unshift(userMessage);
      addComments();
      inputUserComment.value = '';
    }
  };

  addComments();
  moreCommentsButtonElement.addEventListener('click', addMoreComments);
  inputUserCommentButton.addEventListener('click', addUserComment);
  buttonCloseModal.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeModalKeyDown);
  buttonCloseModal.addEventListener('click', () => {
    inputUserCommentButton.removeEventListener('click', addUserComment);
    likesCountElement.removeEventListener('click', getlikesCount);
  }, {once: true});
};

export const createUserPhotos = () => {
  urlArray.forEach((i) => {
    const commentsArray = createCommentsArray();
    const photoInfo = {
      src: `photos/${i}.jpg`,
      likes: getRandomPositiveInteger(50, 200),
      comments: commentsArray,
    };

    const pictureElementClone = pictureTemplateElement.cloneNode(true);
    pictureElementClone.querySelector('.picture__img').src = photoInfo.src;
    pictureElementClone.querySelector('.picture__comments').textContent =
      photoInfo.comments.length;
    pictureElementClone.querySelector('.picture__likes').textContent =
      photoInfo.likes;
    pictureElementClone.addEventListener('click', () =>
      showBigPicture(photoInfo)
    );
    picturesContainer.append(pictureElementClone);
  });
};
