



document.getElementById("userdata-username").textContent = USERDATA.username;
document.getElementById("userdata-level").textContent = USERDATA.level;
document.getElementById("userdata-gold").textContent = USERDATA.gold;


populateQuestTabs();


function loadUserQuests() {

}

function selectQuest() {
	
}

function populateQuestTabs() {
	var elem;

	for (var i = 0; i < USERDATA_QUESTBOOK.userQuests.length; i++) {
		elem = document.createElement("li");
		elem.classList.add("questentry");
		elem.innerHTML = "<h3>"+USERDATA_QUESTBOOK.userQuests[i].name+"</h3><p><em>"+USERDATA_QUESTBOOK.userQuests[i].description+"</em></p>";
		document.getElementById("questlist").appendChild(elem);
	}
}