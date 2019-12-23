var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time'); 
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $result = document.querySelector('#result'); 
var $gameTime = document.querySelector('#game-time')

var score = 0;

var isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime)

var colors = ['red', 'blue', 'black', 'yellow', 'pink', 'orange', 'purple', 'tan'];

function startGame(){
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', true);
    $gameTime.style.background = "#ddd";
    hide($start);
    $game.style.background = "transparent";

    var interval = setInterval(function(){
        isGameStarted = true;
        var time = parseFloat($time.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1); 
        }
    }, 100)

    renderBox();
}

function show($el){
    $el.classList.remove('hide');
}

function hide($el){
    $el.classList.add('hide');
}

function setGameTime() {
    var time = +$gameTime.value;
    $time.textContent = time.toFixed();
    show($timeHeader);
    hide($resultHeader);
}

function setGameScore(){
    $result.textContent = score.toString();
}

function endGame(){
    isGameStarted = false;
    show($start);
    hide($timeHeader);
    show($resultHeader);
    $game.style.background = "#ccc";
    $game.innerHTML = "";
    setGameScore();
    $gameTime.removeAttribute('disabled');
    $gameTime.style.background = "transparent";
}

function handleBoxClick(event){
    if(!isGameStarted){
        return;
    }
 
    if (event.target.dataset.box) {
        score++;
        renderBox();
    } 

    if (event.target.dataset.field){
        $game.style.background = 'red';
        if (score > 0) {
            score--;
        }
        setTimeout(() => {
            $game.style.background = 'transparent';
        }, 100);
    }
}

function renderBox(){ 
    $game.innerHTML = '';
    var box = document.createElement('div');
    var boxSize = getRandom(30, 100);
    var gameSize = $game.getBoundingClientRect();
    var maxTop = gameSize.height - boxSize;
    var maxLeft = gameSize.width - boxSize;
    var color = colors[getRandom(0, colors.length)]

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = '#000';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer'; 
    box.style.background = color;
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}