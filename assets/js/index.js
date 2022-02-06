document.addEventListener('DOMContentLoaded', () => {
  const moment = window.moment || user_options.moment;

  const menuButton = document.querySelector('.menu-button');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuWrapperClose = document.querySelector('.menu-wrapper__close');
  const body = document.querySelector('body');

  const modalCertificate = document.getElementById('modal--certificate');
  const modalBooking = document.getElementById('modal--booking');

  const closeModalButtons = document.querySelectorAll('.modal__close');
  const primaryButtons = document.querySelectorAll('#car-page .button--primary');
  const secondaryButtons = document.querySelectorAll('.button--secondary');

  // calculator nodes
  const priceDays = document.getElementById('priceDays');
  const priceWeekends = document.getElementById('priceWeekends');
  const priceOther = document.getElementById('priceOther');

  const bookingInsurance = document.getElementById('booking-insurance');
  const bookingAdditionalDriver = document.getElementById('booking-additional-driver');
  const bookingAdditionalDriverPrice = document.getElementById('booking-additional-driver-price');
  const bookingAdditionalDriverName = document.getElementById('booking-additional-driver-name');
  const bookingSummaryPrice = document.getElementById('booking-summary-price');
  const bookingSummaryDays= document.getElementById('booking-summary-days');

  // nodes to pass booking for BE
  const bookingBEPrice = document.getElementById('booking-be-price');
  const bookingBEDays = document.getElementById('booking-be-days');
  const bookingBEStart = document.getElementById('booking-be-start');
  const bookingBEEnd = document.getElementById('booking-be-end');

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
      render(state);

      modalBooking.classList.add('modal--opened');
    }
  }

  function closeModal() {
    body.classList.remove('body--block');
    document.querySelector('.modal--opened').classList.remove('modal--opened');

    setState(initialState);
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
  const initialState = {
    days: 0,
    start: null,
    end: null,
    price: 0,
  };
  let state = initialState;

  const nodeCalendar = document.getElementById('my-calendar');
  const myCalendar = new TavoCalendar('#my-calendar', {
    range_select: true,
    locale: 'de',
  });

  function calculatePrice({ days, start, end } = state) {
    let price = 0;

    if (start) {
      const dayOfWeek = new Date(start).getDay();
      const isWeekend = (dayOfWeek === 5) || (dayOfWeek === 6) || (dayOfWeek  === 0);

      if (isWeekend) {
        price += parseInt(priceWeekends.innerHTML);
      } else {
        price += parseInt(priceDays.innerHTML);
      }

      price += (days - 1) * parseInt(priceOther.innerHTML);
    }

    price += parseInt(bookingInsurance.value);

    if (bookingAdditionalDriver.checked) {
      price += parseInt(bookingAdditionalDriverPrice.innerHTML);
    }

    return price;
  };

  function render({ days, price, start, end }) {
    bookingSummaryPrice.innerHTML = price;
    bookingSummaryDays.innerHTML = days;

    bookingBEPrice.value = price;
    bookingBEDays.value = days;
    bookingBEStart.value = start;
    bookingBEEnd.value = end;
  };

  function setState(object) {
    state = {
      ...state,
      ...object,
    };

    render(state);
  };

  nodeCalendar.addEventListener('calendar-select', () => {
    const start = myCalendar.getSelected();

    setState({
      days: 1,
      start,
      price: calculatePrice({ days: 1, start }),
    });
  });

  nodeCalendar.addEventListener('calendar-range', () => {
    const { start, end } = myCalendar.getRange();
    const days = moment(end).diff(moment(start), 'days') + 1;

    setState({
      days,
      start,
      price: calculatePrice({ days, start, end }),
    });
  });

  // second driver event handler
  bookingAdditionalDriver.addEventListener('change', () => {
    setState({
      price: calculatePrice(),
    });

    bookingAdditionalDriverName.classList.toggle('hidden');
  });

  // insurance event handler
  bookingInsurance.addEventListener('change', () => {
    setState({
      price: calculatePrice(),
    });
  });
});
