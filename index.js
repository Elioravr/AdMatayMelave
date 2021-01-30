moment.locale('he', {

})

const licenseDate = new Date(2020, 11, 10);
const morningDate = new Date(2021, 2, 10);
const nightDate = new Date(2021, 5, 10);

var morningMoment = moment(morningDate);
var nightMoment = moment(nightDate);
var licenseMoment = moment(licenseDate);
var today = moment().startOf('day');


const getRemainingDateDetails = (dateInMoment) => {
    var remainingDays = Math.round(moment.duration(dateInMoment - today).asDays());
    var totalDays = Math.round(moment.duration(dateInMoment - licenseMoment).asDays());

    return {
        string: `בעוד ${remainingDays} ימים מתוך ${totalDays}`,
        remainingDays,
        totalDays
    };
}

const setCountdown = (countdownSelector, dateAsMoment) => {
    const countdownEl = document.querySelector(`${countdownSelector} .text`);
    const {string, remainingDays, totalDays} = getRemainingDateDetails(dateAsMoment);
    countdownEl.innerHTML = string;

    const progress = document.querySelector(`${countdownSelector} .progress-bar .progress`);
    const percentages = (totalDays - remainingDays) / totalDays * 100
    progress.style.width = `${percentages}%`;
    progress.innerHTML = `${Math.round(percentages)}%`;

    const dateContainerDayInWeek = document.querySelector(`${countdownSelector} .date-container .day-in-week`);
    dateContainerDayInWeek.innerHTML = dateAsMoment.format('dddd');
    const dateContainerDay = document.querySelector(`${countdownSelector} .date-container .day`);
    dateContainerDay.innerHTML = dateAsMoment.format('DD');
    const monthContainerDay = document.querySelector(`${countdownSelector} .date-container .month`);
    monthContainerDay.innerHTML = dateAsMoment.format('MMMM');
}

setCountdown('.morning-countdown-container', morningMoment);
setCountdown('.night-countdown-container', nightMoment);
