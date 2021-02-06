let licenseDate = new Date(2020, 11, 10);
const savedDate = localStorage.getItem('licenseDate');

if (savedDate) {
    licenseDate = new Date(savedDate);
}

const dateInput = document.querySelector('#license-date-input');

const setLicenseDateOnCalendar = () => {
    const dateAsMoment = moment(licenseDate);

    const dateContainerDayInWeek = document.querySelector(`.license-date-container .date-container .day-in-week`);
    dateContainerDayInWeek.innerHTML = dateAsMoment.format('MMMM');
    const dateContainerDay = document.querySelector(`.license-date-container .date-container .day`);
    dateContainerDay.innerHTML = dateAsMoment.format('DD');
    const monthContainerDay = document.querySelector(`.license-date-container .date-container .month`);
    monthContainerDay.innerHTML = dateAsMoment.format('yyyy');
}

dateInput.value = licenseDate.toISOString().slice(0,10);
setLicenseDateOnCalendar();
dateInput.addEventListener('change', (e) => {
    const chosenDate = new Date(e.target.value);
    licenseDate = chosenDate;
    localStorage.setItem('licenseDate', chosenDate.toISOString());
    setLicenseDateOnCalendar();
    renderEverything();
});

document.addEventListener('scroll', function(e) {
  const scrollY = window.scrollY;
  const separator = document.querySelector('.separator');

  if (scrollY >= 20) {
      separator.classList.remove('long');
  } else {
      separator.classList.add('long');
  }
});

const renderEverything = () => {
    const licenseMoment = moment(licenseDate);
    const morningMoment = moment(licenseDate).add(3, 'months');
    const nightMoment = moment(licenseDate).add(6, 'months');
    const oldDriverMoment = moment(licenseDate).add(2, 'years');
    const today = moment().startOf('day');

    const getRemainingDateDetails = (dateInMoment) => {
        const remainingDays = Math.round(moment.duration(dateInMoment - today).asDays());
        const totalDays = Math.round(moment.duration(dateInMoment - licenseMoment).asDays());

        const text = remainingDays <= 0 ?
            `אתה לא צריך מלווה כבר ${remainingDays * -1} ימים!` :
            `בעוד ${remainingDays} ימים מתוך ${totalDays}`;

        return {
            text,
            remainingDays,
            totalDays
        };
    }

    const setCountdown = (countdownSelector, dateAsMoment) => {
        const countdownEl = document.querySelector(`${countdownSelector} .text`);
        const {text, remainingDays, totalDays} = getRemainingDateDetails(dateAsMoment);
        countdownEl.innerHTML = text;

        if (dateAsMoment - moment() < 0) {
            const progress = document.querySelector(`${countdownSelector} .progress-bar .progress`);
            progress.style.width = `100%`;
            progress.innerHTML = 'מזל טוב! סע בזהירות אה? 😎';
        } else {
            const progress = document.querySelector(`${countdownSelector} .progress-bar .progress`);
            const percentages = (totalDays - remainingDays) / totalDays * 100
            progress.style.width = `${percentages}%`;
            progress.innerHTML = `${Math.round(percentages)}%`;
        }

        const dateContainerDayInWeek = document.querySelector(`${countdownSelector} .date-container .day-in-week`);
        dateContainerDayInWeek.innerHTML = dateAsMoment.format('MMMM');
        const dateContainerDay = document.querySelector(`${countdownSelector} .date-container .day`);
        dateContainerDay.innerHTML = dateAsMoment.format('DD');
        const monthContainerDay = document.querySelector(`${countdownSelector} .date-container .month`);
        monthContainerDay.innerHTML = dateAsMoment.format('yyyy');
    }

    setCountdown('.morning-countdown-container', morningMoment);
    setCountdown('.night-countdown-container', nightMoment);
    setCountdown('.old-driver-countdown-container', oldDriverMoment);
}

const darkModeButton = document.querySelector('.main-container .car-separator .sun');
darkModeButton.addEventListener('click', () => {
    const mainContainer = document.querySelector('.main-container');

    if (mainContainer.classList.contains('dark')) {
        mainContainer.classList.remove('dark');
        darkModeButton.innerHTML = '☀️';
    } else {
        mainContainer.classList.add('dark');
        darkModeButton.innerHTML = '🌔';
    }
})

renderEverything();
