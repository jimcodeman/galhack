const http = require('http').createServer(handler);
const url = require('url');
const fs = require('fs');
const path = require('path');
const express = require('express');
const connect = require('connect');
const io = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const port = process.argv[2] || 3000;
	
let db = new sqlite3.Database('database.db');

io.listen(http.listen(port)).on('connection', function (socket) {
	socket.on('courses.chat', function(data){
		if ( data == 'req' ) {
			let sql = `SELECT * FROM COURSES;`;
			 
			db.all(sql, [], (err, rows) => {
				if (err) {
					throw err;
				}
				rows.forEach((row) => {
					socket.emit('courses.chat',{ func : row.func , name : row.name , description : row.desc });
				});
			});
		}
	});
});

function handler (req,res) {
	// parse URL
	const parsedUrl = url.parse(req.url);
	// extract URL path
	let pathname = `.${parsedUrl.pathname}`;
	// based on the URL path, extract the file extention. e.g. .js, .doc, ...
	const ext = path.parse(pathname).ext;
	// maps file extention to MIME typere
	const map = {
		'.ico': 'image/x-icon',
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.json': 'application/json',
		'.css': 'text/css',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.wav': 'audio/wav',
		'.mp3': 'audio/mpeg',
		'.svg': 'image/svg+xml',
		'.pdf': 'application/pdf',
		'.doc': 'application/msword',
		'.txt': 'text/plain'
	};

	  
	fs.exists(pathname, function (exist) {
		if(!exist) {
			// if the file is not found, return 404
			res.statusCode = 404;
			res.end(`File ${pathname} not found!`);
			return;
		}

		// if is a directory search for index file matching the extention
		if (fs.statSync(pathname).isDirectory())
			pathname += '/index' + ext;

		// read file from file system
		else if( req.method == 'GET' ) {
			//console.log(`${req.method} ${req.url}`);
			fs.readFile(pathname, function(err, data){
				if(err){					
					res.statusCode = 500;
					res.end(`Error getting the file: ${err}.`);
				} else {

					res.setHeader('Access-Control-Allow-Origin', '*');
					res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
					res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
					res.setHeader('Access-Control-Allow-Credentials', true);


					res.setHeader('Content-type', map[ext] || 'text/plain' );
					res.end(data);
				}
			});
		}
		//set file data in system
		else if( req.method == 'POST' ) {
			
			req.on('data', function(data) {
				
				//console.log(`${req.method} ${req.url} ${data}`);
				
				fs.writeFile(pathname, data , function(err){
					if(err){
						res.statusCode = 500;
						res.end(`Error getting the file: ${err}.`);
					} else {

						res.setHeader('Access-Control-Allow-Origin', '*');
						res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
						res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
						res.setHeader('Access-Control-Allow-Credentials', true);


						res.setHeader('Content-type', map[ext] || 'text/plain' );
						res.end('conmplete writing');
					}
				});
			});
		}
		//handle options request
		else if ( req.method == 'OPTIONS' ) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
			res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
			res.setHeader('Access-Control-Allow-Credentials', true);
			
			res.end(200);
		}
		//unhandled method requests
		else{
			//console.log(`Error processing ${req.method} request`);
			next();
		}
	});
}

console.log(`Server listening on port ${port}`);