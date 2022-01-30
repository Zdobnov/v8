document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuWrapperClose = document.querySelector('.menu-wrapper__close');
  const body = document.querySelector('body');

  const modalCertificate = document.getElementById('modal--certificate');
  const modalBooking = document.getElementById('modal--booking');

  const closeModalButtons = document.querySelectorAll('.modal__close');
  const primaryButtons = document.querySelectorAll('#car-page .button--primary');
  const secondaryButtons = document.querySelectorAll('.button--secondary');

  // MENU HANDLING
  function toggleMenuWrapper() {
    menuWrapper.classList.toggle('menu-wrapper__opened');
  }

  menuButton.addEventListener('click', toggleMenuWrapper);
  menuWrapperClose.addEventListener('click', toggleMenuWrapper);

  // MODAL HANDLING
  function openModal(type) {
    body.classList.add('body--block');

    if (type === 'certificate') {
      modalCertificate.classList.add('modal--opened');
    } else {
      modalBooking.classList.add('modal--opened');
    }
  }

  function closeModal() {
    body.classList.remove('body--block');
    document.querySelector('.modal--opened').classList.remove('modal--opened');
  }

  for (let i = 0; i < primaryButtons.length; i++) {
    primaryButtons[i].addEventListener('click', () => openModal());
  };

  for (let i = 0; i < secondaryButtons.length; i++) {
    secondaryButtons[i].addEventListener('click', () => openModal('certificate'));
  };

  for (let i = 0; i < closeModalButtons.length; i++) {
    closeModalButtons[i].addEventListener('click', closeModal);
  };

  // TAVO CALENDAR
  // https://www.cssscript.com/event-calendar-date-picker/
  const myCalendar = new TavoCalendar('#my-calendar', {
    range_select: true,
    locale: 'de',
  });
});
