
function getParam(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null; 
}

const url_userImage = "https://upload-api-image123.s3.amazonaws.com/";
const url_signout = "https://10mob4aqg8.execute-api.us-east-1.amazonaws.com/Dev/cognito/signout_test";
const url_getFlashcard = "https://10mob4aqg8.execute-api.us-east-1.amazonaws.com/Dev/postapi";

let userName = getParam("username");
// let userImage = getParam("userImage");
let role= getParam("role");
let creatorUsername = getParam("creatorUsername")
let tokenType = getParam("tokenType")
let idToken = getParam("idToken")
// New - add access token
let accessToken = getParam("accessToken")

var addFlashcardOption = document.getElementById("addFlashcardOption");
if (role === "instructor"){
	addFlashcardOption.selected = true;
} else{
	addFlashcardOption.style.display = "none";
}


// New - function to support logout
function logout() {
	$.ajax({
		mode: 'no-cors',
		method: 'POST',
		headers: {
			'Authorization': tokenType + " " + idToken
		},
		url: url_signout,
		data: JSON.stringify({
			'AccessToken': accessToken
		}),
		success: function(data) {
			if (data.statusCode == 200) {
				alert('Logout successfully');
				} else {
				alert('The token has been expired');
				}
				// Redirect the user to the login page
				window.location.href = "/";
		},
		dataType: 'json'
	})
}


// Add an event listener to the select element
document.getElementById("mySelect").addEventListener("change", function() {
	// Get the selected option and trigger an event
	var selectedOption = this.options[this.selectedIndex];
	selectedOption.dispatchEvent(new Event('click'));
});
	
// Add event listeners to each option (button)
var options = document.querySelectorAll("#mySelect option");
options.forEach(function(option) {
	option.addEventListener("click", function() {
		if (option.value === "option3"){
			logout();
		}else if (option.value ==="option2"){
			location.href = `./createFlushCard.html?username=${userName}&tokenType=${tokenType}&idToken=${idToken}&accessToken=${accessToken}`;
			// location.href = 'createFlushcard.html" + "?username=" + userName + "&tokenType=" + tokenType + "&idToken=" + idToken +"&accessToken=" + accessToken; 
		}
	});
});
	
window.onload = function() {
let userImage = url_userImage + userName;

$(".userName").text(userName)
$(".userInfo img").attr("src", userImage)
// let createPageLink = $(".addButton").attr("href")
// New - append access token to url
// $(".addButton").attr("href", createPageLink + "?username=" + userName + "&tokenType=" + tokenType + "&idToken=" + idToken +"&accessToken=" + accessToken)


if(role == "instructor")
	$(".addButton").show()
else if(role == "student")
	$(".addButton").hide()


$.get({
	url: url_getFlashcard,
	data: {"creatorUsername": creatorUsername},
	headers: {
		'Authorization': tokenType + " " + idToken
	},
	dataType:"json",

	success: (data) => {
		console.log(data)
		data = JSON.parse(data.body)
		let flushcards = data.flashcards;
		let flushCardList = $(".flushCardList")
		flushCardList.html("")

		if(flushcards){
			flushcards.forEach((item, index)=> {
				console.log("adding flush card")
				console.log(item)
				let listNode = $("<li>")
				let flushCardNode = $("<div class = 'flushCard'></div>")
				let termNode = $("<div class = 'term'> </div>")
				let descriptionNode = $("<div class = 'description'></div>")
				let timeNode = $("<div class = 'time'></div>")

				termNode.text(item.term)
				descriptionNode.text(item.description)
				timeNode.text(item.creationDate)

				termNode.show()
				descriptionNode.hide()

				flushCardNode.append(termNode, descriptionNode, timeNode)
				listNode.append(flushCardNode)

				flushCardNode.click(() => {
					flushCardNode.toggleClass('flushCardRotate')
					if($(descriptionNode).is(":hidden")) {
						descriptionNode.show()
						termNode.hide()
					}
					else {
						descriptionNode.hide()
						termNode.show()
					}

				})

				flushCardList.append(listNode)
			})
		}
	}

})
}

