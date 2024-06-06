const subtractSecondsFromCurrentTime = (seconds) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - seconds);
    return date;
};

module.exports = {
    subtractSecondsFromCurrentTime
};
