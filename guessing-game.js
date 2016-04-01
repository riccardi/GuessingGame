var winningNum = generateNumber();
var numGuesses = 5;
var prevGuesses = [];

$(document).ready(function() {
	console.log("winning number: " + winningNum);

	$("#guess").keypress(function(e) {
	    if(e.which == 13) {
	        var message = guess($("#guess").val());
			$("#status").html(message);
			$("#guess").attr("value","");
	    }
	});
	$("#submit").click(function() {
		var message = guess($("#guess").val());
		$("#status").html(message);
		$("#guess").attr("value","");
	});

	$("#play_again").click(function() {
		playAgain();
	});

	$("#hint").click(function() {
		var hint = giveHint();
		$("#status").html(hint);
	});

});

function generateNumber() {
	return Math.round(Math.random()*100);
}

function guess(num) {
	if (numGuesses == 0) {
		$("#hint").attr("disabled","disabled");
		$("#submit").attr("disabled","disabled");
		return "You have no more guesses left. Please click Play Again.";
	} else {
		numberGuessed = parseInt(num);
		if (isValid(numberGuessed) == "Valid") {
			if (isWinningNumber(numberGuessed)) {
				return "You are the winner!";
			} else {
				return lowerOrHigher(numberGuessed);
			}
		} else if (isValid(numberGuessed) == "Invalid") {
			return "Your guess is not valid. Please input a number between 1 & 100";
		} else if (isValid(numberGuessed) == "Duplicate") {
			return "You submitted a duplicate guess.";
		}
	}
}

function lowerOrHigher(num) {
	var direction = '';
	var distance = '';
	var difference = Math.abs(winningNum-num);

	if (num > winningNum) {
		direction = "Your guess is too high ";
	} else {
		direction = "Your guess is too low ";
	}

	if (difference > 30) {
		distance = "and it is cold!";
	} else if (difference >= 20) {
		distance = "and it is within 30 of the winning number!";
	} else if (difference >= 10) {
		distance = "and it is within 20 of the winning number!";
	} else if (difference >= 5) {
		distance = "and it is within 10 of the winning number!";
	} else if (difference >= 1) {
		distance = "and it is within 5 of the winning number!";
	}

	displayGIF();
	numGuesses--;
	prevGuesses.push(numberGuessed);
	$("#num_guesses > span").html(numGuesses);

	return direction + distance;
}

function isWinningNumber(num) {
	if (numberGuessed == winningNum) {
		$("#hint").attr("disabled","disabled");
		$("#submit").attr("disabled","disabled");
		displayGIF("winner");
		numGuesses--;
		return true;
	} else {
		return false;
	}
}

function isValid(num) {
	if (num < 1 || num > 100) {
		return "Invalid";
	} else if (prevGuesses.indexOf(num) != -1) {
		return "Duplicate";
	} else {
		return "Valid";
	}
}

function playAgain() {
	numGuesses = 5;
	prevGuesses = [];
	winningNum = generateNumber();
	console.log("new winning number: " + winningNum);
	$("#status").html("");
	$("#hint").removeAttr("disabled");
	$("#submit").removeAttr("disabled");
	$("#num_guesses > span").html(numGuesses);
	$("#gif").html("");
}

function giveHint() {
	var hintArray = [];
	for(var i=1; i < (numGuesses*2); i++) {
		hintArray.push(generateNumber());
	}
	var index =Math.round(Math.random()*hintArray.length);
	hintArray.splice(index,0,winningNum);
	return "One of these is the winning number:<br />" + hintArray.join(", ");
}

function displayGIF(player_status) {
	var winnerGIFs = ['<iframe src="//giphy.com/embed/xbASkE3pEK7pC" width="480" height="274" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/l41lWcjB65zASTfGM" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/tswHdSIDNfAUE" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'];
	var loserGIFs = ['<iframe src="//giphy.com/embed/oIOVkU7Upb3wY" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/TlTxstYNiz0Yg" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="//giphy.com/embed/oRFWicT90ngbK" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="http://i.imgur.com/n0mcL51.gifv" width="294" height="233" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="http://i.imgur.com/wT1oWv4.gifv" width="385" height="284" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="http://i.imgur.com/VUuQFqu.gifv" width="321" height="261" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'];

	if(player_status == "winner") {
		var index = Math.round(Math.random()*winnerGIFs.length);
		$("#gif").html(winnerGIFs[index]);
	} else {
		var index = Math.round(Math.random()*loserGIFs.length);
		$("#gif").html(loserGIFs[index]);
	}
}