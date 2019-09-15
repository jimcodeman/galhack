var vel = [{x:0,y:0}];
var pos = [{x:0,y:0}];
var count = 225 ;

function positionParticle( i ) {

	var size = Math.random()*0.25 ;

	scale(document.getElementById('Rod'+i),size);
	ranomize(document.getElementById('Rod'+i));

	var x = map_range(Math.random(),0,0.5,-($(document).width())/100,+($(document).width())/100) ;
	var y = map_range(Math.random(),0,0.5,-($(document).height())/100,+($(document).height())/100) ;

	vel[ i ] = {x:x,y:y} ;
	if ( Math.abs(vel [ i ].x) < 0.1 ) vel [ i ].x = 1 ;
	if ( Math.abs(vel [ i ].y) < 0.1 ) vel [ i ].y = 1 ;

	pos[ i ] = {x:Math.random()*($(document).width())-50,y:Math.random()*($(document).height())-50} ;
}

function createParticle( i ) {
	var element = document.createElement("div");
	element.id = 'Rod'+i ;
	element.setAttribute("class","Rod") ;
	document.body.appendChild(element);
}

for ( var i = 0 ; i < count ; i++ ) {
	createParticle(i);
	positionParticle(i);
}

setInterval(frame,16);

function bounce ( i ) {
	var elem = document.getElementById('Rod'+i) ;
	positionParticle(i);
	ranomize(elem);
}

function frame ( ) {

	$(window).trigger("resize");

	for ( var i = 0 ; i < count ; i++ ) {
		var speed = 6 ;
		pos[i].x += vel[i].x*speed*0.016 ;
		pos[i].y += vel[i].y*speed*0.016 ;

		setpos(document.getElementById('Rod'+i),pos[i].x,pos[i].y);

		if ( pos[i].x < 0 || ( pos[i].x + vel[i].x*2 ) > ($(document).width()) || pos[i].y < 0 || ( pos[i].y + vel[i].y*2 ) > ($(document).height()) )
			bounce(i);

	}
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function ranomize(elem) {
	var y = 40+Math.floor(Math.random() * 50) ;
	var bgColor = "rgb(" + 226 + "," + y + "," + 34 + ")";

	elem.style.background = bgColor;
}

function scale(elem,size){
	elem.style.width = size + 'vw' ;
	elem.style.height = size + 'vw' ;
}

function setpos( elem , x , y ) {
	elem.style.position = "absolute";
	elem.style.left = x+'px';
	elem.style.top = y+'px';
}
