const licenseDate = new Date(2020, 11, 10);

var licenseMoment = moment(licenseDate);
var morningMoment = moment(licenseDate).add(3, 'months');
var nightMoment = moment(licenseDate).add(6, 'months');
var today = moment().startOf('day');

const getRemainingDateDetails = (dateInMoment) => {
    var remainingDays = Math.round(moment.duration(dateInMoment - today).asDays());
    var totalDays = Math.round(moment.duration(dateInMoment - licenseMoment).asDays());

    const text = remainingDays <= 0 ?
        `אתה לא צריך מלווה כבר ${remainingDays * -1} ימים!` :
        `בעוד ${remainingDays} ימים מתוך ${totalDays}`

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
    dateContainerDayInWeek.innerHTML = dateAsMoment.format('dddd');
    const dateContainerDay = document.querySelector(`${countdownSelector} .date-container .day`);
    dateContainerDay.innerHTML = dateAsMoment.format('DD');
    const monthContainerDay = document.querySelector(`${countdownSelector} .date-container .month`);
    monthContainerDay.innerHTML = dateAsMoment.format('MMMM');
}

setCountdown('.morning-countdown-container', morningMoment);
setCountdown('.night-countdown-container', nightMoment);
