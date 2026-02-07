let homeScore = 0;
let guestScore = 0;
let homeTimeouts = 0;
let guestTimeouts = 0;
let homeFouls = 0;
let guestFouls = 0;
let elapsedSeconds = 0;
let periodCount = 0;
let timerIntervalId = null;
const playSymbol = '▶';
const pauseSymbol = '❚❚';

const quarterLengthSeconds = 12 * 60;

function addScore(team, points) {
    if (team === 'home') {
        homeScore += points;
        document.getElementById('home-score').textContent = homeScore.toString().padStart(2, '0');
    } else if (team === 'guest') {
        guestScore += points;
        document.getElementById('guest-score').textContent = guestScore.toString().padStart(2, '0');
    }

    updateLeaderHighlight();
}

function resetScores() {
    homeScore = 0;
    guestScore = 0;
    document.getElementById('home-score').textContent = '00';
    document.getElementById('guest-score').textContent = '00';
    homeTimeouts = 0;
    guestTimeouts = 0;
    homeFouls = 0;
    guestFouls = 0;
    document.getElementById('home-timeouts').textContent = '0';
    document.getElementById('guest-timeouts').textContent = '0';
    document.getElementById('home-fouls').textContent = '0';
    document.getElementById('guest-fouls').textContent = '0';
    elapsedSeconds = 0;
    periodCount = 0;
    updateTimerDisplay(0);
    updatePeriodDisplay();
    if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }
    updateTimerButton(false);
    updateLeaderHighlight();
}

function updateLeaderHighlight() {
    const homeLabel = document.getElementById('home');
    const guestLabel = document.getElementById('guest');

    homeLabel.classList.remove('leader');
    guestLabel.classList.remove('leader');

    if (homeScore > guestScore) {
        homeLabel.classList.add('leader');
    } else if (guestScore > homeScore) {
        guestLabel.classList.add('leader');
    }
}

function startTimer() {
    if (timerIntervalId !== null) {
        return;
    }

    timerIntervalId = setInterval(() => {
        elapsedSeconds += 1;

        if (elapsedSeconds >= quarterLengthSeconds) {
            updateTimerDisplay(quarterLengthSeconds);

            if (periodCount >= 4) {
                clearInterval(timerIntervalId);
                timerIntervalId = null;
                updateTimerButton(false);
                return;
            }

            periodCount = Math.min(periodCount + 1, 4);
            updatePeriodDisplay();
            elapsedSeconds = -1;
            return;
        }

        updateTimerDisplay(elapsedSeconds);
    }, 1000);
}

function toggleTimer() {
    if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
        updateTimerButton(false);
        return;
    }

    if (periodCount >= 4) {
        return;
    }

    if (periodCount === 0) {
        periodCount = 1;
        updatePeriodDisplay();
    }

    startTimer();
    updateTimerButton(true);
}

function updateTimerDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;

    document.getElementById('timer-display').textContent = formattedTime;
}

function updatePeriodDisplay() {
    document.getElementById('period-count').textContent = periodCount.toString();
}

function updateTimerButton(isRunning) {
    const toggleButton = document.getElementById('timer-toggle');
    if (!toggleButton) {
        return;
    }

    toggleButton.textContent = isRunning ? `${pauseSymbol} Pause` : `${playSymbol} Start`;
}

function addStat(team, stat) {
    if (team === 'home' && stat === 'timeouts') {
        homeTimeouts += 1;
        document.getElementById('home-timeouts').textContent = homeTimeouts.toString();
        return;
    }

    if (team === 'home' && stat === 'fouls') {
        homeFouls += 1;
        document.getElementById('home-fouls').textContent = homeFouls.toString();
        return;
    }

    if (team === 'guest' && stat === 'timeouts') {
        guestTimeouts += 1;
        document.getElementById('guest-timeouts').textContent = guestTimeouts.toString();
        return;
    }

    if (team === 'guest' && stat === 'fouls') {
        guestFouls += 1;
        document.getElementById('guest-fouls').textContent = guestFouls.toString();
    }
}
