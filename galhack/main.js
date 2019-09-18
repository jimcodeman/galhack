var socket = io.connect('http://127.0.0.1:3000');

socket.emit('courses.chat','req');
socket.on('courses.chat', function (data) {
	console.log(data);
	createCourse(data.func,data.name,data.description);
});

var courseList = document.createElement("div");
courseList.setAttribute("class","courseList");

var text = document.createElement("div") ;
text.appendChild ( document.createTextNode("Welcome") ) ;
text.setAttribute( "class" , "WelcomeText" ) ;

document.body.appendChild(text);

function reset(){
	document.body.appendChild (text) ;
	if ( courseList.parentElement ) document.body.removeChild (courseList) ;
}

var Courses = [{background:null,button:null}] ;

function home ( ) {
	reset();
}

function createCourse (func,head,text) {

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
	button.setAttribute("onclick",func);
	button.appendChild(document.createTextNode("Select"));
	background.appendChild(button);

	courseList.appendChild(background);
}

function courses ( ) {
	reset();
	document.body.removeChild (text) ;
	if(!courseList) {
		courseList = document.createElement("div");
		courseList.setAttribute("class","courseList");

		socket.emit('courses.chat','req');
	}
	document.body.appendChild (courseList) ;
}
