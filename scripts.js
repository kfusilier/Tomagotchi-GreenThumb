// GLOBAL VARIABLES
let workLeft = 100
let user = {
	name: '',
	thirst: 0,
	loneliness: 0,
	dog: 100,
	remWork: 0,
}

// BUTTONS
const resetValueBtn = $('.reset-btn')
const startForm = $('.start-form')
const restartGame = $('.restart-btn')

//VALUE BARS
const $thirstBar = $('#thirst-bar')
const $dogBar = $('#dog-bar')
const $lonelinessBar = $('#loneliness-bar')
const $remBar = $('.rw-bar')

// USER LEVEL FUNCTIONS
let thirstIntervalId = ''
let dogIntervalId = ''
let lonelinessIntervalId = ''
let remIntervalId = ''
let graphicIntervalId = ''

// GAME START
function gameStart(e) {
	e.preventDefault()
	popupsBeGone()
	user.name = $(".username-field").val()
	$(".username").text(user.name)
    $(".plantName").text(user.name)
	play()
}

// HIDE POP UPS
function popupsBeGone() {
	$('.lose-popup').css('display', 'none')
	$('.win-popup').css('display', 'none')
	$('.start-popup').css('display', 'none')
}

// PLAY GAME
function play() {
	$('.graphic').css('background-image', 'url("images/seedling.png")')   
	remWorkLvl($remBar, 3000)
	thirstLvl($thirstBar, 150)
	dogLvl($dogBar, 300)
	lonelinessLvl($lonelinessBar, 200)

// IMAGE/TEXT CHANGE - STATUS COLOR ALERTS
	graphicIntervalId = setInterval(function () {   
        
        if (user.remWork < 5 )  {
            $('.graphic').css('background-image', 'url("images/seedling.png")')
        }   else if (user.remWork >= 5 && user.remWork < 9) {
            $('.graphic').css('background-image', 'url("images/sprout.png")')
        }   else {
            $('.graphic').css('background-image', 'url("images/grown.png")')
        }   
        if (user.dog < 30)   {
            $('.graphic').text("Save me from the dog, take it for a walk!")
        }   else if (user.thirst > 70)  {
            $('.graphic').text("I'm so thirsty, water me!")   
        }   else if (user.loneliness > 70)  {
            $('.graphic').text("I'm lonely, talk to me!")
        }   else {
            $('.graphic').text("")
        }
        $dogBar.css("background-color", user.dog < 30 ? "#F59A66" : "var(--main-color)")
        $thirstBar.css("background-color",user.thirst > 70 ? '#F59A66' : "var(--main-color)")
        $lonelinessBar.css("background-color",user.loneliness > 70 ? '#F59A66' : "var(--main-color)")
    }, 
    1000)
	if (user.thirst >= 100 || user.loneliness >= 100 || user.dog <= 0) {
		gameOver()
	}
}

// RESET VALUES - GAME END
function resetAllValues() {
	for (const stats in user) {
		if (stats == 'name') {
			// console.log(`the users name is ${user[stats]}`)
		} else if (stats == 'dog') {
			user[stats] = 100
			$lonelinessBar.css('width', user[stats] + '%')
			// console.log(user[stats])
		} else {
			user[stats] = 0
			// console.log(user[stats])
			$thirstBar.css('width', user[stats] + '%')
			$dogBar.css('width', user[stats] + '%')
			$remBar.css('width', user[stats] + '%')
		}
	}
}

// WIN GAME
function winGame() {
	$('.win-popup').css('display', 'flex')
	resetAllValues()
}

// LOSE GAME
function gameOver() {
	$('.lose-popup').css('display', 'flex')
	resetAllValues()
}

// START VALUE BARS
function thirstLvl(bar, speed) {
	thirstIntervalId = setInterval(function () {
		user.thirst++
		bar.css('width', user.thirst + '%')
		if (user.thirst >= 100) {
			clearAllIntervals()
			gameOver()
		}
	}, speed)
}

function dogLvl(bar, speed) {
	dogIntervalId = setInterval(function () {
		user.dog--
		bar.css('width', user.dog + '%')
		if (user.dog <= 0) {
			clearAllIntervals()
			gameOver()
		}
	}, speed)
}

function lonelinessLvl(bar, speed) {
	lonelinessIntervalId = setInterval(function () {
		user.loneliness++
		bar.css('width', user.loneliness + '%')
		if (user.loneliness >= 100) {
			clearAllIntervals()
			gameOver()
		}
	}, speed)
}

function remWorkLvl(bar, speed) {
	remIntervalId = setInterval(function () {
		user.remWork++
		bar.css('width', user.remWork * 10  + '%')
		$('.rw-percent').text(user.name + " is " + user.remWork + " days old")
		if (user.remWork >= 10) {
			clearAllIntervals()
			winGame()
		}
	}, speed)
}

// STOP VALUE BAR
function clearAllIntervals() {
	clearInterval(thirstIntervalId)
	clearInterval(lonelinessIntervalId)
	clearInterval(dogIntervalId)
	clearInterval(remIntervalId)
	clearInterval(graphicIntervalId)
}

// RESET VALUES BUTTON CLICK
function resetValue(e) {
	e.preventDefault()
	if (this.id == 'thirst') {
		clearInterval(thirstIntervalId)
		user.thirst = 0
		$thirstBar.css('width', user.thirst + '%')
		thirstLvl($thirstBar, 150)
	} else if (this.id == 'loneliness') {
		clearInterval(lonelinessIntervalId)
		user.loneliness = 0
		$lonelinessBar.css('width', user.loneliness + '%')
		lonelinessLvl($lonelinessBar, 200)
	} else {
		clearInterval(dogIntervalId)
		user.dog = 100
		$dogBar.css('width', user.dog + '%')
		dogLvl($dogBar, 300)
	}
}

// INTERACTION EVENTS
startForm.on('submit', gameStart)
resetValueBtn.on('click', resetValue)
restartGame.on('click', gameStart)