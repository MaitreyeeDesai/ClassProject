/**
 * New node file
 */

//[TODO: add, edit delete contacts, also form groups of the contacts, get list of contacts, get list of groups in JSON/ HTML]
//reference database template contacts and contact groups
var ejs = require("ejs");
var mysql = require('./mysql');
var csv=require("fast-csv");

exports.getContactListJSON = function(req, res) {
	var userObj=req.session.user;
	var owned=userObj.id;
	var getQuery = "select *from contacts where ownerId="+owned;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(results);
			var responseString = JSON.stringify(results);
			res.send(responseString);

		}
	}, getQuery);

};

exports.addContact=function(req,res)
{
	var data;
	var responseString;
	var Fname = req.param("first_name");
	if (Fname == null || typeof (Fname) == 'undefined') {
		data = {
			errorCode : 101,
			message : "First name requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Lname = req.param("last_name");
	if (Lname == null || typeof (Lname) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Last name requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var Email = req.param("email");
	if (Email == null || typeof (Email) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Email requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var grpId = req.param("group-id");
	if (grpId == null || typeof (grpId) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Please select a group for the contact"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var newContactData = {
		fname : Fname,
		lname : Lname,
		email:Email,
		groupId:grpId,
		isRead:0
	};
	mysql.insertData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("new contact registered.")
			data = {
				errorCode : 100,
				message : "The contact was saved successfully"
			};
			responseString = JSON.stringify(data);
			res.send(responseString);
		}

	}, newContactData, "contacts");
	
};


exports.addBulkContacts=function(req,res)
{
	csv
	 .fromPath("Desktop/test.csv")
	 .on("data", function(data){
	    console.log(data);
	 })
	 .on("end", function(){
	     console.log("done");
	 });
	
	
	
	};