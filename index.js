let homeEl = document.getElementById("home-score")
let guestEl = document.getElementById("guest-score")
let newGameButton = document.getElementById("newgame-button")
let pauseButton = document.getElementById("pause-button")
let scoreBoard = document.getElementById("timer")
let warningText = document.getElementById("warning-text")


let homeCount = 0
let guestCount = 0
let maxScore = 1000
let team = null
let timeInterval
let pauseInterval
let gameToggle = "off" 
let pauseToggle = "off" 



let start = null
let pauseStart = null
let pauseDuration = null
let pauseVariable = null
let lastPauseLength = 0
let totalPause = 0
let clock = 0
let addMinutes = 0

newGameButton.addEventListener('click', function () {
    if(clock>0) {
      newGame()
      warningText.textContent = "" 
    } else{
      warningText.textContent = "CANNOT START: Time must be added"
    }
})
pauseButton.addEventListener('click', function () {
    if(clock>0) {
      pauseGame()  
      warningText.textContent = "" 
    } else{
      warningText.textContent = "CANNOT PAUSE: Time must be added"
    }
})

function minuteSwitcher(clicked_id) {
   
   if (clicked_id == "add-minute1") {
       addMinutes = 5*60
   } else if (clicked_id == "add-minute2") {
       addMinutes = 15*60
   } else if (clicked_id == "add-minute3") {
       addMinutes = 30*60
    }
}

const timerButtons = document.getElementsByClassName("timer-buttons")

for (let i = 0; i < timerButtons.length; i++) {
    timerButtons[i].addEventListener('click', function () {
    minuteSwitcher(this.id)
    addTime()
    })
}

function newGame() {
    
    homeCount = 0
    guestCount = 0
    homeEl.innerText = 0
    guestEl.innerText = 0
    
    //shut down interval, reset timer *should stop counting
    if(gameToggle == "on"){
        clearInterval(timeInterval)
        newGameButton.innerText = "New Game"
        newGameButton.style.background = '#B9F2CD'
        newGameButton.style.color = '#157A37'
        gameToggle = "off"
        scoreBoard.textContent = "00:00:00"
        
        pauseButton.innerText = "Pause"
        pauseToggle = "off" //shows game is back on
        pauseButton.style.background = '#FFD88A'
        pauseButton.style.color = '#D89000'
        pauseButton.style.fontSize = '15px'
            
        }
        
    else{
        timeInterval = setInterval(Timer, 1000)
        totalPause = 0
        gameToggle = "on"
        newGameButton.style.background = '#fc7a57'
        newGameButton.style.color = '#9B2226'
        newGameButton.innerText = "Stop Game"
    }
}


function pauseGame() {
    
    if(gameToggle == "on"){
        if(pauseToggle == "on"){
            timeInterval = setInterval(Timer, 1000) //turn timer back on
            //clearInterval(pauseInterval)
            
            pauseButton.innerText = "Pause"
            pauseToggle = "off" //shows game is back on
            pauseButton.style.background = '#FFD88A'
            pauseButton.style.color = '#D89000'
            pauseButton.style.fontSize = '15px'
            
            }
            
        else {
            
            clearInterval(timeInterval)//clears game interval (not text)
            pauseButton.innerText = "PLAY"
            pauseButton.style.fontSize = '15px'
            pauseButton.style.background = '#aae5a4'
            pauseButton.style.color = '#157a37'
            pauseToggle = "on" //shows game as paused
        }
    }
    
}

function addTime() {
    if(gameToggle=="off" || pauseToggle=="on"){
        clock += addMinutes
        let h = Math.trunc(clock/3600 ).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false})
        let m = Math.trunc(clock/60 % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false})
        let s = Math.trunc(clock % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2, 
            useGrouping: false})
            
        scoreBoard.textContent = h +":"+m+":"+s
        warningText.textContent = ""
    }
}

const homeButtons = document.getElementsByClassName("home-button")
const guestButtons = document.getElementsByClassName("guest-button")

for (let i = 0; i < homeButtons.length; i++) {
    homeButtons[i].addEventListener('click', function () {
    team = "home"
    addToScore(Number(this.textContent))
    })
}

for (let i = 0; i < guestButtons.length; i++) {
    guestButtons[i].addEventListener('click', function () {
    team = "guest"
    addToScore(Number(this.textContent))
    })
}

function addToScore(num) {
    if(gameToggle=="on" && pauseToggle=="off"){
        if(team === "home" && homeCount+1 < maxScore) {
            homeCount+= num
            homeEl.innerText = homeCount
        }
        if(team === "guest" && guestCount+1 < maxScore) {
            guestCount+= num
            guestEl.innerText = guestCount
        }  
    }
}


function Timer() {
    
    if(clock>0){
        clock = clock - 1 
        
        let h = Math.trunc(clock/3600 ).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false})
        let m = Math.trunc(clock/60 % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false})
        let s = Math.trunc(clock % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2, 
            useGrouping: false})
            
        scoreBoard.textContent = h +":"+m+":"+s
    
        }
    else{
        newGame()
    }
}