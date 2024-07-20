function createTimer(hours, minutes, seconds) {
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    let timeRemaining = totalTime;

    const timerObject = {
        totalTime,
        timeRemaining,
        intervalId: null,
        displayElement: null,
        audioAlert: new Audio('alert-sound.mp3'), 
    };

    return timerObject;
}

function startTimer(timer) {
    timer.intervalId = setInterval(() => {
        timer.timeRemaining--;

        if (timer.timeRemaining < 0) {
            clearInterval(timer.intervalId);
            timer.displayElement.classList.add('timer-ended'); 
            timer.audioAlert.play(); // Play audio alert
        } else {
            updateTimerDisplay(timer);
        }
    }, 1000); 
}

function updateTimerDisplay(timer) {
    const hours = Math.floor(timer.timeRemaining / 3600);
    const minutes = Math.floor((timer.timeRemaining % 3600) / 60);
    const seconds = timer.timeRemaining % 60;

    timer.displayElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startTimer');
    const activeTimersContainer = document.getElementById('activeTimers');

    startButton.addEventListener('click', () => {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        if (hours === 0 && minutes === 0 && seconds === 0) {
            alert('Please enter a valid time.');
            return;
        }

        const timer = createTimer(hours, minutes, seconds);
        const timerElement = document.createElement('div');
        timerElement.className = 'timer';
        timer.displayElement = timerElement;

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Timer';
        stopButton.addEventListener('click', () => {
            clearInterval(timer.intervalId);
            timerElement.remove(); 
        });

        timerElement.appendChild(stopButton);
        activeTimersContainer.appendChild(timerElement);

        startTimer(timer);
    });
});