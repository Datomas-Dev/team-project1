"use strict";

const USERDATA = new User();
const USERDATA_QUESTBOOK = new QuestBook();

const USERDATA_SAVEALL = Symbol("USERDATA_SAVEALL");
const USERDATA_SAVEACCOUNT = Symbol("USERDATA_SAVEACCOUNT");
const USERDATA_SAVEQUESTBOOK = Symbol("USERDATA_SAVEQUESTBOOK");

/*
const QUEST_STATUS_INCOMPLETE = Symbol("QUEST_STATUS_INCOMPLETE");
const QUEST_STATUS_COMPLETE = Symbol("QUEST_STATUS_COMPLETE");
const QUEST_STATUS_FAILED = Symbol("QUEST_STATUS_FAILED");

const QUEST_RESET_DAILY = Symbol("QUEST_RESET_DAILY");

const QUESTSTEP_DIFFICULTY_EASY = Symbol("QUESTSTEP_DIFFICULTY_EASY");
const QUESTSTEP_DIFFICULTY_MEDIUM = Symbol("QUESTSTEP_DIFFICULTY_MEDIUM");
const QUESTSTEP_DIFFICULTY_HARD = Symbol("QUESTSTEP_DIFFICULTY_HARD");
*/



//if(userHasAccount() && isUserLoggedIn())
loadUserData();





/* Constructors */


function User() {
	this.username = null;
	this.password =null;
	this.email = null;

	this.level = 1;

	this.gold = 0;
	this.battleTokens = 2;

	this.autoLogin = false;

	this.accountCreated = new Date(null);
	//this.firstDailyLogIn = new Date(null); // Checked against the current Date to know if the user is logging in on a new day
	this.lastLogIn = new Date(null); // Updated each time the user logs in
	this.lastSeen = new Date(null); // Last time a activity was seen from the user
	//this.loggedIn = false; // If the user is currently logged in
}

User.prototype.reset = function() {
	this.username = null;
	this.password =null;
	this.email = null;

	this.level = 1;

	this.gold = 0;
	this.battleTokens = 2;

	this.autoLogin = false;

	this.accountCreated = new Date(null);
	//this.firstDailyLogIn = new Date(null); // Checked against the current Date to know if the user is logging in on a new day
	this.lastLogIn = new Date(null); // Updated each time the user logs in
	this.lastSeen = new Date(null); // Last time a activity was seen from the user
	//this.loggedIn = false; // If the user is currently logged in
};




function QuestBook() {
	this.userQuests = []; // Hold the base user-defined quests
	this.questList = []; // List of QuestInstances that can be updated
	
	this.finishedQuests = []; // Array of the IDs of QuestInstances that are finished
}

QuestBook.prototype.fillCollections = function() {
	return this.questList;
};

QuestBook.prototype.reset = function() {
	this.userQuests = []; // Hold the base user-defined quests
	this.questList = []; // List of QuestInstances that can be updated
	
	this.finishedQuests = []; // Array of the IDs of quests that are finished
};


function Quest() {
	this.name = "";
	this.description = "";
	this.icon = null;
	this.exp = 0;
	this.gold = 0;
	
	this.difficulty = "easy";

	//this.isLocked = false;

	//this.isRecurring = false;
	//this.reset;
	this.nextReset = null;

	//this.deadline;

	this.questSteps = [];

	this.creationDate = new Date(null);
};




function QuestStep(description) {
	this.description = description;
	this.difficulty = "easy";
	this.complete = false;
};



function QuestInstance() {
	this.questIndex = null; // The index of userQuests the instance relates to
	this.status = "incomplete";
	this.questSteps = [];
	this.nextReset = null;
}



/*  Quest  */


function createQuest() {

}

//* Signup Functions *//


function validateSignup(e) {
	var form = document.forms.signupform;

	// prevent signing up with the same username somehow

	
	if(!form.username.checkValidity()) return;
	if(!form.password.checkValidity()) return;
	if(form.passwordconfirm.value !== form.password.value) return;
	if(!form.email.checkValidity()) return;
	if(!form.termsbox.checkValidity()) return;


	createAccount(form.username.value,form.password.value,form.email.value);
	logInUser();
	
	window.location = "dashboard.html";

	//setUserData("userid",form.userid.value);
	
	//logIn();
}


function createAccount(username,password,email) {
	
	clearUserData();
	
	USERDATA.reset();
	USERDATA_QUESTBOOK.reset();
	
	loadUserData();
	
	setUserData("username",username);
	setUserData("password",password);
	setUserData("email",email);
	setUserData("accountCreated",new Date());

	saveUserData(USERDATA_SAVEALL);
}


function validateLogin() {
	let form = document.forms.loginform;	

	if((getUserData("username") === null) || (form.username.value.toLowerCase() !== getUserData("username").toLowerCase())) {
		alert("Account with that username does not exist.");
		return;
	}

	if(form.password.value !== getUserData("password")) {
		alert("Incorrect password for account.");
		return;
	}

	logInUser();
	location = "dashboard.html";
}

function logInUser() {
	console.log("Logging in user.")
	//loadUserData();

	setUserData("lastLogIn",new Date());
	updateUserActivity();
	// if (daily log in)

	saveUserData(USERDATA_SAVEALL);
	//updateQuestBook();

	sessionStorage.setItem("loggedIn",true);
}

function logOutUser() {
	saveUserData(USERDATA_SAVEALL);
	sessionStorage.setItem("loggedIn",false);
}


function updateUserActivity() {
	console.log("User activity updated.");
	setUserData("lastSeen",new Date());
}





/* User Data Functions */


function setUserData(key,data) {
	if(USERDATA.hasOwnProperty(key)) {
		USERDATA[key] = data;
	}
	else 
		throw new ReferenceError(key+" is not defined in the user data");
}

function getUserData(key) {
	if(USERDATA.hasOwnProperty(key))
		return USERDATA[key];
	else 
		throw new ReferenceError(key+" is not defined in the user data");
}


// Loads data from localStorage to the USERDATA object
function loadUserData() {
	console.log("Loading user data from storage:");
	
	let loaded = JSON.parse(localStorage.getItem("USERDATA"));

	for (let item in loaded) {
		switch(item) {
			case "accountCreated":
			case "firstDailyLogIn":
			case "lastLogIn":
			case "lastSeen":
				USERDATA[item] = new Date(loaded[item]);
				break;
			default:
				USERDATA[item] = loaded[item];
				break;
		}
		console.log(typeof USERDATA[item]+" "+item);
	}
	console.log("...done.");

	loaded = JSON.parse(localStorage.getItem("USERDATA_QUESTBOOK"));

	for (let item in loaded) {
		switch(item) {
			case "created":
				USERDATA_QUESTBOOK[item] = new Date(loaded[item]);
				break;
			default:
				USERDATA_QUESTBOOK[item] = loaded[item];
				break;
		}
		console.log(typeof USERDATA_QUESTBOOK[item]+" "+item);
	}
	console.log("...done.");
	updateUserActivity();
}

// Saves the data to the browser's storage
function saveUserData(which) {
	// All
	// Account
	// Quest Book

	updateUserActivity();

	switch(which)
	{
		case(USERDATA_SAVEACCOUNT):
			localStorage.setItem("USERDATA",JSON.stringify(USERDATA));
			//alert("User account data saved.");
			break;
		case(USERDATA_SAVEQUESTBOOK):
			localStorage.setItem("USERDATA_QUESTBOOK",JSON.stringify(USERDATA_QUESTBOOK));
			//alert("User Quest Book data saved.");
			break;
		case(USERDATA_SAVEALL):
			saveUserData(USERDATA_SAVEACCOUNT);
			saveUserData(USERDATA_SAVEQUESTBOOK);
			break;
	}
}

function clearUserData() {
	localStorage.clear();
	sessionStorage.clear();
}

// Checks if the necessary data is in place
function userHasAccount() {
	return localStorage.hasOwnProperty("USERDATA");
}

function isUserLoggedIn() {
	//return (user.loggedin === true) ? true : false;
	return (sessionStorage.getItem("loggedIn") == "true") ? true : false;
}

function resetExperience() {
	if(window.confirm("Are you sure you want to reset the experience? All saved data will be lost. Click OK to continue.")) {
		clearUserData();
		location = "../index.html";
	}
}