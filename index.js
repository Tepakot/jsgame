var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $timePlus = document.querySelector('#plus')
var $timeMinus = document.querySelector('#minus')
var gameTime = $time.textContent;
=======



var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$timePlus.addEventListener('click', gameTimeSet)
$timeMinus.addEventListener('click', gameTimeSet)

function gameTimeSet() {
    gameTime = $time.textContent;
    if(this.id === 'plus') {
        $time.textContent++;
        show($timeHeader)
        hide($resultHeader)
    } else if($time.textContent <= 1) {
        $time.textContent = 1;
    } else {
        $time.textContent--;
        show($timeHeader)
        hide($resultHeader)
    }
    
}

function startGame() {
    $timePlus.setAttribute('disabled', 'true')
    $timeMinus.setAttribute('disabled', 'true')

function startGame() {
    score = 0
    setGameTime()
    
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = 'white'

    var interval = setInterval(function(){
        var time = parseFloat($time.textContent)
        if (time <= 0){
            //end game
            clearInterval(interval)
            endGame()

        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    
    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    show($start)
    show($resultHeader)
    hide($timeHeader)
    setGameScore()
    $timePlus.removeAttribute('disabled')    
    $timeMinus.removeAttribute('disabled')    
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''    
    $time.textContent = gameTime
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''    
}



function hide($el) {
    $el.classList.add('hide')
}

function show($el) {
    $el.classList.remove('hide')
}

function handleBoxClick(e) {
    if (!isGameStarted){
        return
    }

    if (e.target.dataset.box) {
        renderBox()
        score++
    }
}

function renderBox() {    
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var color = 'rgba('+getRandom(0,255)+','+getRandom(0,255)+','+getRandom(0,255)+')'
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = color
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
