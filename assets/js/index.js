document.addEventListener('DOMContentLoaded', () => {
  const moment = window.moment || user_options.moment;

  moment.locale('de');

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

  const bookingTimeStart = document.getElementById('booking-time-start');
  const bookingTimeEnd = document.getElementById('booking-time-end');
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
      // render(state);

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
  // const initialState = {
  //   days: 0,
  //   startDay: null,
  //   endDay: null,
  //   startTime: bookingTimeStart.value,
  //   endTime: bookingTimeEnd.value,
  //   startDate: null,
  //   endDate: null,
  //   price: 0,
  // };
  // let state = initialState;

  // const nodeCalendar = document.getElementById('my-calendar');
  // const myCalendar = new TavoCalendar('#my-calendar', {
  //   range_select: true,
  //   locale: 'de',
  //   date: "2022-02-12",
  //   date_start: "2022-02-15",
  //   date_end: "2022-02-17",
  //   range_select: true
  // });
  //
  // function calculatePrice({ days, startDay, endDay } = state) {
  //   let price = 0;
  //
  //   if (startDay) {
  //     const dayOfWeek = new Date(startDay).getDay();
  //     const isWeekend = (dayOfWeek === 5) || (dayOfWeek === 6) || (dayOfWeek  === 0);
  //
  //     if (isWeekend) {
  //       price += parseInt(priceWeekends.innerHTML);
  //     } else {
  //       price += parseInt(priceDays.innerHTML);
  //     }
  //
  //     price += (days - 1) * parseInt(priceOther.innerHTML);
  //   }
  //
  //   price += parseInt(bookingInsurance.value);
  //
  //   if (bookingAdditionalDriver.checked) {
  //     price += parseInt(bookingAdditionalDriverPrice.innerHTML);
  //   }
  //
  //   return price;
  // };
  //
  // function render({ days, price, startDay, endDay }) {
  //   bookingSummaryPrice.innerHTML = price;
  //   bookingSummaryDays.innerHTML = days;
  //
  //   bookingBEPrice.value = price;
  //   bookingBEDays.value = days;
  //   bookingBEStart.value = startDay;
  //   bookingBEEnd.value = endDay;
  // };
  //
  // function setState(object) {
  //   state = {
  //     ...state,
  //     ...object,
  //   };
  //
  //   render(state);
  // };
  //
  // nodeCalendar.addEventListener('calendar-select', () => {
  //   const startDay = myCalendar.getSelected();
  //
  //   setState({
  //     days: 1,
  //     startDay,
  //     price: calculatePrice({ days: 1, startDay }),
  //   });
  // });
  //
  // nodeCalendar.addEventListener('calendar-range', () => {
  //   const { start, end } = myCalendar.getRange();
  //   const days = moment(end).diff(moment(start), 'days') + 1;
  //
  //   setState({
  //     days,
  //     startDay: start,
  //     price: calculatePrice({
  //       days,
  //       startDay: start,
  //       endDay: end,
  //     }),
  //   });
  // });
  //
  // bookingTimeStart.addEventListener('change', function(event) {
  //   setState({
  //     startTime: event.target.value,
  //   });
  // });
  //
  // bookingTimeEnd.addEventListener('change', function(event) {
  //   setState({
  //     endTime: event.target.value,
  //   });
  // });

  // second driver event handler
  // bookingAdditionalDriver.addEventListener('change', () => {
    // setState({
    //   price: calculatePrice(),
    // });
    //
    // bookingAdditionalDriverName.classList.toggle('hidden');
  // });

  // insurance event handler
  // bookingInsurance.addEventListener('change', () => {
    // setState({
    //   price: calculatePrice(),
    // });
  // });

  const START = moment(new Date).format("YYYY-MM-DD");
  const END = moment(new Date).add(1, 'days').format("YYYY-MM-DD");

  const initialState = {
    price: 0,
    priceDays: parseInt(priceDays.innerHTML),
    priceWeekends: parseInt(priceWeekends.innerHTML),
    priceNext: parseInt(priceOther.innerHTML),
    startDay: START,
    startTime: bookingTimeStart.value,
    startDate: null,
    days: 0,
    insuranceFee: parseInt(bookingInsurance.value),
    isSecondDriver: bookingAdditionalDriver.checked,
    secondDriverFee: parseInt(bookingAdditionalDriverPrice.value),
    endDay: END,
    endTime: bookingTimeEnd.value,
    endDate: null,
  };
  let state = initialState;

  const nodeCalendar = document.getElementById('my-calendar');
  const myCalendar = new TavoCalendar('#my-calendar', {
    range_select: true,
    locale: 'de',
    date: moment(new Date).format("YYYY-MM-DD"),
    date_start: START,
    date_end: END,
    range_select: true,
  });

  function setState(newState = {}) {
    state = {
      ...state,
      ...newState,
    };

    state.startDate = getMomentDate({ date: state.startDay, time: state.startTime });
    state.endDate = getMomentDate({ date: state.endDay, time: state.endTime });
    state.days = calculateDays(state);
    state.price = calculatePrice(state);

    render(state);
  };

  function render(state) {
    bookingSummaryPrice.innerHTML = state.price;
    bookingSummaryDays.innerHTML = state.days;

    bookingBEPrice.value = state.price;
    bookingBEDays.value = state.days;
    bookingBEStart.value = state.startDate.format('DD-MMMM-YYYY HH:mm');
    bookingBEEnd.value = state.endDate.format('DD-MMMM-YYYY HH:mm');
  };

  function getMomentDate({ date, time }) {
    return moment(date + ' ' + time);
  };

  function calculateDays(state) {
    let days = Math.ceil(moment.duration(state.endDate.diff(state.startDate)).asDays());

    if (days < 1) {
      days = 1;
    }

    return days;
  };

  function calculatePrice(state) {
    let price = 0;

    const dayOfWeek = new Date(state.startDay).getDay();
    const isWeekend = (dayOfWeek === 5) || (dayOfWeek === 6) || (dayOfWeek  === 0);

    if (isWeekend) {
      price += state.priceWeekends;
    } else {
      price += state.priceDays;
    }

    price += (state.days - 1) * state.priceNext;
    price += state.insuranceFee;

    if (state.isSecondDriver) {
      price += state.secondDriverFee;
    }

    return price;
  };

  // Calendar Events
  nodeCalendar.addEventListener('calendar-select', () => {
    const selectedDay = myCalendar.getSelected();

    setState({
      startDay: selectedDay,
      endDay: selectedDay,
    });
  });

  nodeCalendar.addEventListener('calendar-range', () => {
    const { start, end } = myCalendar.getRange();

    setState({
      startDay: start,
      endDay: end,
    });
  });

  // Selector Events
  bookingTimeStart.addEventListener('change', event => {
    setState({ startTime: event.target.value });
  });

  bookingTimeEnd.addEventListener('change', event => {
    setState({ endTime: event.target.value });
  });

  bookingInsurance.addEventListener('change', event => {
    setState({
      insuranceFee: parseInt(event.target.value),
    });
  });

  bookingAdditionalDriver.addEventListener('change', event => {
    setState({
      isSecondDriver: event.target.checked,
    });

    bookingAdditionalDriverName.classList.toggle('invisible');
  });

  setState();
});
