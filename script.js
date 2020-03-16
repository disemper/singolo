document.addEventListener("DOMContentLoaded", function(event) {

  const menuList = document.querySelectorAll('.main-menu__link'),
        header = document.querySelector('.header'),
        deviceScreen = document.querySelectorAll('.device__element--screen'),
        deviceHomeBtn = document.querySelectorAll('.device__element--home');
        portfolioGrid = document.querySelector('.portfolio-grid'),
        portfolioList = document.querySelectorAll('.portfolio-item'),
        form = document.querySelector('.form'),
        modal = document.querySelector('.modal');
        modalOk = document.querySelector('.modal__button.button--ok');
        modalClose = document.querySelector('.modal__button.button--close');
        overlay = document.querySelector('.overlay');
        filtersItems = document.querySelectorAll('.filters__item');


  //menu - set active and scroll
  menuList.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const targetID = this.getAttribute('href');
      const target = document.querySelector(targetID);
      const scrollValue = target.offsetTop - header.offsetHeight;
      window.scrollTo({
        top: scrollValue,
        behavior: 'smooth'
      });
      document.querySelector('.main-menu__link--active').classList.remove('main-menu__link--active');
      this.classList.add('main-menu__link--active')
    });
  });

  //slider
  deviceHomeBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      this.parentElement.querySelector('.device__background').classList.toggle('device__background--hidden')
    })
  });

  //portfolio
  let arrSrc = [];
  portfolioList.forEach(function (item) {
    item.addEventListener('click', function () {
      const activeElement = item.parentElement.querySelector('.portfolio-item--active');
      if (activeElement) {
        activeElement.classList.remove('portfolio-item--active');
      }
      this.classList.add('portfolio-item--active');
    });

    arrSrc.push(item.firstElementChild.getAttribute('src'));
  });

  filtersItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      this.parentElement.querySelector('.filters__button--active').classList.remove('filters__button--active');
      this.firstElementChild.classList.add('filters__button--active');

      let shuffleArr = shuffle(arrSrc, index);
      portfolioList.forEach(function (item, index) {
       item.firstElementChild.setAttribute('src', shuffleArr[index]);
      });

    })
  });

  function shuffle(arr, shift){
    return arr.map((item, index, arr) => index < shift ? arr[arr.length + index - shift] : arr[index - shift]);
  }

  //form
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    showModal(modal);
  });

  [modalOk, modalClose, overlay].forEach(function (elem) {
    elem.addEventListener('click', function () {
      hideModal(modal);
    });
  });

  function showModal(modal) {
    modal.classList.add('modal--active');
    overlay.classList.add('overlay--visible');
  }
  function hideModal(modal) {
    modal.classList.remove('modal--active');
    overlay.classList.remove('overlay--visible');
  }

});