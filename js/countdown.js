// Countdown Timer Module

let countdownInterval = null;
let remainingTime = 0;
let isCountdownRunning = false;

function startCountdown() {
    // Pega o tempo configurado (em segundos)
    const timeInput = document.getElementById('countdownTime');
    const totalSeconds = parseInt(timeInput.value) || 60;
    
    // Para qualquer countdown anterior
    stopCountdown();
    
    // Inicializa o countdown
    remainingTime = totalSeconds;
    isCountdownRunning = true;
    
    // Atualiza a UI
    const displayDiv = document.getElementById('countdownDisplay');
    const stopBtn = document.getElementById('stopBtn');
    
    displayDiv.classList.add('running');
    displayDiv.classList.remove('warning', 'finished');
    stopBtn.disabled = false;
    
    updateCountdownDisplay();
    
    // Inicia o intervalo
    countdownInterval = setInterval(function() {
        remainingTime--;
        updateCountdownDisplay();
        
        // Aviso quando faltam 10 segundos
        if (remainingTime <= 10 && remainingTime > 0) {
            displayDiv.classList.add('warning');
        }
        
        // Quando chega a zero
        if (remainingTime <= 0) {
            finishCountdown();
        }
    }, 1000);
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    isCountdownRunning = false;
    
    const displayDiv = document.getElementById('countdownDisplay');
    const stopBtn = document.getElementById('stopBtn');
    
    displayDiv.classList.remove('running', 'warning');
    stopBtn.disabled = true;
}

function finishCountdown() {
    stopCountdown();
    
    const displayDiv = document.getElementById('countdownDisplay');
    displayDiv.classList.add('finished');
    displayDiv.textContent = '00:00';
    
    // Opcional: Tocar um som ou mostrar alerta
    // alert('Tempo esgotado!');
}

function updateCountdownDisplay() {
    const displayDiv = document.getElementById('countdownDisplay');
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    
    displayDiv.textContent = 
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
}

function isCountdownActive() {
    return isCountdownRunning;
}

function getRemainingTime() {
    return remainingTime;
}
