var check=true;
var start=false;
var x,curr;
var move,pair,score;
var maxTime,timeOut,tInterval,timeInterval;

function gameReset() {
	reset();
}
function gameStart() {
	reset();
	start=true;
	curr=new Array();
	var img = ["Butterfly-icon", "Dolphin-icon", "Elephant-icon", "Hippopotamus-icon", "Panda-icon", "Turtle-icon", "Butterfly-icon", "Dolphin-icon", "Elephant-icon", "Hippopotamus-icon", "Panda-icon","Turtle-icon"];
	for(var i=0;i<12;i++)
	{
		var rand=Math.floor(Math.random() * img.length);
		curr[i]=img[rand];
		img.splice(rand, 1);
		document.getElementById("i"+i).innerHTML =`<img class="image2" src="images/`+curr[i]+`.png" alt="">`;
	}
	timeOut=setTimeout(hide,3000);
	var max=3;
	tInterval = setInterval(function () {
																				max = max-1;
																				document.getElementById("time").innerHTML = "Time: "+max;
																				if (max <= 0) {
																					clearInterval(tInterval);
																					document.getElementById("time").innerHTML = "Time: "+max;
																				}
																			},1000
													);
}
function hide() {
	for(var i=0;i<12;i++){
		document.getElementById('i'+i).innerHTML = '<img class="image1" src="images/close.png" alt="CLOSE">';
	}
	timeOut=setTimeout(result,20000);
	maxTime=20;
	timeInterval = setInterval(function () {
																						maxTime = maxTime-1;
																						document.getElementById("time").innerHTML = "Time: "+maxTime;
																						if (maxTime <= 0) {
																							clearInterval(timeInterval);
																							document.getElementById("time").innerHTML = "Time: "+maxTime;
																							reset();
																						}
																					},1000
														);
}
function result() {
	if(pair==6){
		alert("Congrats! You Win");
	}
	else {
		alert("Sorry! You Loose");
	}
}

function reset() {
	clearTimeout(timeOut);
	clearInterval(tInterval);
	clearInterval(timeInterval);
	x=undefined;
	curr=undefined;
	check=true;
	start=false;
	move=0;
	pair=0;
	score=0;
	for(var i=0;i<12;i++){
		document.getElementById('i'+i).innerHTML = '<img class="image1" src="images/close.png" alt="CLOSE">';
	}
	document.getElementById('i'+12).innerHTML = `
		<div id="time" class="c_time">Time: 0</div>
		<div id="move" class="c_move">Move: 0</div>
		<div id="pair" class="c_pair">Pair: 0</div>
		<div id="score" class="c_score">Score: 0</div>
		<button onclick="gameStart();" id="start" class="button c_start">Start</button>
		<button onclick="gameReset();" id="reset" class="button c_reset">Reset</button>`;
}
function play(y) {
	if(start==true && curr[y]!=undefined){
		if(check==true) {
			check=false;
			move=move+1;
			x=y;
			display(y);
		}
		else {
			if(y==x){
				alert("Again Click");
			}
			else if(curr[x]===curr[y])
			{
				check=true;
				move=move+1;
				pair=pair+1;
				calculate();
				display(y);
				curr[x]=undefined;
				curr[y]=undefined;
			}
			else
			{
				move=move+1;
				display(y);
				setTimeout(function() {
																document.getElementById('i'+y).innerHTML = '<img class="image1" src="images/close.png" alt="CLOSE">';
															}, 200
									);

			}
		}
	}
	else {
		alert("Start Game or Win Move");
	}
}
function display(y) {
	document.getElementById("move").innerHTML = "Move: "+move;
	document.getElementById("pair").innerHTML = "Pair: "+pair;
	document.getElementById("i"+y).innerHTML =`<img class="image2" src="images/`+curr[y]+`.png" alt="">`;
}
function calculate() {
	score=score+maxTime*pair;
	document.getElementById("score").innerHTML = "Score: "+score;
}
