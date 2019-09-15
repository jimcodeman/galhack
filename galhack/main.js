var accountId = -1 ;
var logingIn = false ;

var text = document.createElement("div") ;
text.setAttribute("class","WelcomeText");
text.appendChild(document.createTextNode("Welcome"));

var LOGIN_div = document.createElement("div");
LOGIN_div.setAttribute("class","LogInDiv");
LOGIN_div.setAttribute("id","logindiv");

var LOGIN_username = document.createElement("input");
LOGIN_username.setAttribute("class","LogInUsername");

var LOGIN_password = document.createElement("input");
LOGIN_password.setAttribute("class","LogInPassword");
LOGIN_password.setAttribute("type","password");

var LOGIN_loginbutton = document.createElement("button");
LOGIN_loginbutton.setAttribute("class","LogInButton");
LOGIN_loginbutton.appendChild(document.createTextNode("Log In"));

LOGIN_div.appendChild(LOGIN_username);
LOGIN_div.appendChild(LOGIN_password);
LOGIN_div.appendChild(LOGIN_loginbutton);

document.body.appendChild(text);

var courseList ;

function reset(){
	if(logingIn)ShowLogIn();
	document.body.appendChild(text);

	if(courseList){
		while (courseList.firstChild) {
    			courseList.removeChild(courseList.firstChild);
  		}
	}
}

function ShowLogIn ( ) {

	if( !logingIn ) {
		home();
		document.body.appendChild(LOGIN_div);
		document.body.removeChild(text);
	}
	else {
		document.body.removeChild(LOGIN_div);
		document.body.appendChild(text);
	}

	logingIn = !logingIn ;

}

var Courses = [{background:null,button:null}] ;

function home ( ) {
	reset();
}

function createCourse (head,text) {

	var background = document.createElement("dir");
	background.setAttribute("class","courseBackground");
	background.appendChild(document.createTextNode(head));

	var desc = document.createElement("dir");
	desc.appendChild(document.createTextNode(text));
	desc.setAttribute("class","courseDescription");
	background.appendChild(desc);

	//

	var button = document.createElement("button");
	button.setAttribute("class","courseButton");
	button.appendChild(document.createTextNode("Select"));
	background.appendChild(button);

	courseList.appendChild(background);
}

function courses ( ) {
	reset();
	document.body.removeChild (text) ;
	courseList = document.createElement("div") ;
	courseList.setAttribute("class","courseList");
	document.body.appendChild (courseList) ;

	createCourse("Segment Tree\n","Range Queries and Updates O(logN) each");
	createCourse("Binary Index Tree\n","Simple Range Queries and Updates O(logN) each");
	createCourse("Dijkstra\n","Minimum path find algorithm O(NlogN)");
}
