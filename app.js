var strikeButton = document.querySelector("#strike");
var resetButton = document.querySelector("#reset");
var team1score_tag = document.getElementById("score-team1");
var team2score_tag = document.getElementById("score-team2");
var team1Wicket_tag = document.getElementById("wicket-team1");
var team2Wicket_tag = document.getElementById("wicket-team2");
var strikeAudio = new Audio("http://bit.ly/so-ball-hit");
var gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");
var team1Score = 0;
var team2Score = 0;
var team1Wickets = 0;
var team2Wickets = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;

var possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];
strikeButton.addEventListener("click", strikeButtonClicked);

function strikeButtonClicked() {
    strikeAudio.pause(); 
    strikeAudio.currentTime = 0; 
    strikeAudio.play();
    var randomness = Math.random();
    var random1 = randomness * possibleOutcomes.length;
    var randomIndex = Math.floor(random1);
    var randomValue = possibleOutcomes[randomIndex];

    if (turn == 2) {
        team2BallsFaced++;
        var ball = document.querySelector("#team-2-super-over div:nth-child(" + team2BallsFaced + ")");
        ball.innerHTML = randomValue;
        if (randomValue == "W") {
            team2Wickets++;
        } else {
            team2Score += randomValue;
        }
        updateScore();
        if (team2Score > team1Score || team2Wickets == 2 || team2BallsFaced == 6) {
            turn = 3;
            setTimeout(() => {
                gameOver();
            }, 100);
        }
    }

    if (turn == 1) {
        team1BallsFaced++;
        var ball = document.querySelector("#team-1-superover div:nth-child(" + team1BallsFaced + ")");
        ball.innerHTML = randomValue;
        if (randomValue == "W") {
            team1Wickets++;
        } else {
            team1Score += randomValue;
        }

        if (team1BallsFaced == 6 || team1Wickets == 2) {
            turn = 2;
        }

        updateScore();
    }
}

function updateScore() {
    team1score_tag.innerHTML = team1Score;
    team1Wicket_tag.innerHTML = team1Wickets;
    team2score_tag.innerHTML = team2Score;
    team2Wicket_tag.innerHTML = team2Wickets;
}

function gameOver() {
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
    if (team1Score > team2Score) {
        alert("INDIA WIN");
    } else if (team1Score < team2Score) {
        alert("PAK WINS");
    } else if (team1Score == team2Score) {
        alert("It's is a tie!");
    }
    document.querySelectorAll(".ball").forEach(kalvium => {
        if (kalvium.innerHTML == "") {
            kalvium.innerHTML = "X";
            kalvium.style.backgroundColor = "grey";
        }
    });
}

resetButton.addEventListener("click", resetFunction);

function resetFunction() {
    window.location.reload();
}
