document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuWrapperClose = document.querySelector('.menu-wrapper__close');

  function toggleMenuWrapper() {
    menuWrapper.classList.toggle('menu-wrapper__opened');
  }

  menuButton.addEventListener('click', toggleMenuWrapper);
  menuWrapperClose.addEventListener('click', toggleMenuWrapper);
});
