var request = new XMLHttpRequest();
var question = 1;
var score = 0;
var index = 0;
var result = null;
var count = 0;
var userAnswer;
var userAnswers = [];
var answer;
request.open('GET','https://cdn.rawgit.com/santosh-suresh/39e58e451d724574f3cb/raw/784d83b460d6c0150e338c34713f3a1c2371e20a/assignment.json');
request.responseType = 'text';
request.send();
request.onload = function() {
	result = JSON.parse(request.response);
	count = result.length;
	getData(question, count, index);
}

function getData(question, count, index) {
	if(index<count) {
		document.getElementById("next").disabled = true;
		answer = result[index].answer;
		document.getElementById("quiz").innerText= "JavaScript Quiz " + question + " of " + count;
		document.getElementById("question").innerText= result[index].text;
		result[index].options.forEach(optionAdd);
	}
}

function optionAdd(option) {
	document.getElementById("options").innerHTML += "<li>-  " + option + "</li> <br>";
}

function next() {
	question = question + 1;
	index = index + 1;
	if(answer == userAnswer) {
		score++;
	}
	document.getElementById("options").innerText="";
	getData(question, count, index);
	if(question == count) {
		document.getElementById("next").style.display = "none";
		document.getElementById("submit").style.display = "block";
	} 
}

function doSelect(selected) {
	document.getElementById("next").removeAttribute("disabled");
	if(document.getElementById("submit").style.display == "block") {
		document.getElementById("submit").removeAttribute("disabled");
	}
	userAnswer = selected;
	userAnswers[index] = selected;
}

function submit() {
	document.getElementById("question-board").innerHTML="Hi your score is " + score;
	document.getElementById("question-board").classList.add("result");
	var suggertionElement = document.createElement("div");
	var suggestion;
	if(score>=0 && score<count/2) {
		suggestion = "we were expecting more from you."
	} else if(score>=count/2 && score<count) {
		suggestion = "I think you should try one more time you can make it better."
	} else if(score==count) {
		suggestion = "Oh ho so you are here, you made it dude!"
	}
	suggertionElement.classList.add("suggest");
	suggertionElement.appendChild(document.createTextNode(suggestion));
	document.getElementById("question-board").appendChild(suggertionElement);
	var x = document.createElement("TABLE");
	var reportElement = document.getElementById("reportTable");
	reportElement.innerHTML+="<tr><th>ques no. </th><th> your ans  </th><th>  correct ans </th></tr>";
	for(var i=0;i<count;i++) {
		reportElement.innerHTML+="<tr><td>" + (i+1) + " </td><td>" + userAnswers[i] + " </td><td>" +  result[i].answer + "</td></tr>";
	}
	suggertionElement.appendChild(reportElement);
	document.getElementById("reportTable").classList.add("reportTable");
}