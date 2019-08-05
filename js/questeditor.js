

/*
	Step Difficulty:
	Easy: 20 EXP
	Medium: 50 EXP
	Hard: 100 EXP

	Length Multiplier
	Daily: x1
	Weekly: x2
	Monthly: x4
*/

var editType;

var questForm = {
	name: document.getElementById("edit-name"),
	description: document.getElementById("edit-description")
}

//document.getElementById("edit-recurring").addEventListener("change",toggleRecurring);

function validateQuest() {
	
	if(questForm.name.value === "") {
		alert("Your Quest must have a name!");
		return;
	}

	createQuest();
}

/*
function toggleRecurring() {
	console.log(document.getElementById("edit-recurring").checked);

	if(document.getElementById("edit-recurring").checked) {
		document.getElementById("edit-resetblock").style.display = "block";
	}
	else
		document.getElementById("edit-resetblock").style.display = "none";

}
*/



function createQuest() {
	createdQuest = new Quest();

	createdQuest.name = questForm.name.value.trim();
	createdQuest.description = questForm.description.value;
	createdQuest.creationDate = new Date();
	
	//
	createdQuest.questSteps.push(0);
	//
	
	USERDATA_QUESTBOOK.userQuests.push(createdQuest);
	
	
	saveUserData(USERDATA_SAVEALL);
	
	// -add quest steps to the object


	location = "dashboard.html";
}


function determineQuestRewards() {

}

// Adds a quest step to the ul for editing by the user
function addQuestStep(argument) {
	let newStep = document.createElement("li");
	
	newStep.dataset.stepid = 0;
	newStep.innerHTML = `<input type="text" class="queststepedit"></input>`;
	newStep.onclick = selectQuestStep;
	
	document.getElementById("queststeps").appendChild(newStep);
}

function selectQuestStep(e) {
	e.target.classList.add("stepSelected");
}


		// delete selected quest steps and resort the id indexes
