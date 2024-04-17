(() => {
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const statusElement = document.getElementById('status');

    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');

    const audio = new Audio('audios/completed.wav');

    let minutes = 25;
    let seconds = 0;
    let pomodoroState = 'work';
    let pomodoroStarted = false;
    let pomodoroRunning = false;
    let pomodoroRound = 4;
    let interval;

    function requestNotificationPermission() {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    sendNotification('Notifications enabled!');
                }
            });
        }
    }

    function sendNotification(content) {
        if (Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: content,
                icon: 'images/pomodoro.png'
            });
        }
    }

    function updateDisplay() {
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        if (pomodoroRunning) {
            if (pomodoroState === 'work') {
                statusElement.textContent = 'Work!';
            } else if (pomodoroState === 'rest') {
                statusElement.textContent = 'Rest!';
            } else if (pomodoroState === 'end') {
                statusElement.textContent = 'End!';
            }
        } else {
            statusElement.textContent = '';
        }
    }

    function updateState() {
        if (pomodoroRunning) {
            if (pomodoroState === 'work') {
                pomodoroState = 'rest';
                minutes = 5;
                seconds = 0;
                sendNotification('Time to take a break!');
            } else if (pomodoroState === 'rest') {
                pomodoroState = 'work';
                minutes = 25;
                seconds = 0;
                pomodoroRound--;
                sendNotification('Time to work!');
            }
            audio.play();
        }
    }

    function startTimer() {
        requestNotificationPermission();

        if (!pomodoroStarted || pomodoroState === 'end') {
            pomodoroState = 'work';
            pomodoroStarted = true;
            pomodoroRound = 4;
            minutes = 25;
            seconds = 0;
        }

        pomodoroRunning = true;

        interval = setInterval(() => {
            seconds--;

            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }

            if (minutes === 0 && seconds === 0) {
                updateState();

                if (pomodoroRound === 0) {
                    clearInterval(interval);
                    pomodoroState = 'end';
                    minutes = 0;
                    seconds = 0;
                }
            }

            updateDisplay();
        }, 1);

        updateDisplay();
    }

    function pauseTimer() {
        clearInterval(interval);
        pomodoroRunning = false;
    }

    function resetTimer() {
        clearInterval(interval);
        pomodoroStarted = false;
        pomodoroRunning = false;
        minutes = 25;
        seconds = 0;
        updateDisplay();
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    updateDisplay();
})();