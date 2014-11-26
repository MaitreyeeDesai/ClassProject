/**
 * New node file
 */

// [TODO: add, edit delete contacts, also form groups of the contacts, get list
// of contacts, get list of groups in JSON/ HTML]
// reference database template contacts and contact groups
var ejs = require("ejs");
var mysql = require('./mysql');
var csv = require("fast-csv");

exports.getContactListJSON = function(req, res) {
	var userObj = req.session.user;
	var owned = userObj.id;
	var getQuery = "select *from contacts where ownerId=" + owned;
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

exports.getContactGroupListJSON = function(req, res) {
	var userObj = req.session.user;
	var owned = userObj.id;
	var getQuery = "select *from contactgroup where ownerId=" + owned;
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

exports.addContact = function(req, res) {
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
	var ownedBy = req.session.user.Id;
	var newContactData = {
		fname : Fname,
		lname : Lname,
		email : Email,
		groupId : grpId,
		isRead : 0,
		ownerId : ownedBy
	};
	mysql.insertData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("new contact registered.");
			data = {
				errorCode : 100,
				message : "The contact was saved successfully"
			};
			responseString = JSON.stringify(data);
			res.send(responseString);
		}

	}, newContactData, "contacts");

};

exports.addBulkContacts = function(req, res) {
	// [TODO: take the file from the incoming reques]
	var resdata;
	var responseString;
	csv
			.fromPath("test.csv")
			.on(
					"data",
					function(data) {
						console.log(data);
						if (data[0] !== "fname") {
							var Fname = data[0];
							var Lname = data[1];
							var Email = data[2];
							var grpName = data[3];

							var getQ = "select *from contactgroup where groupName= '"
									+ grpName + "'";
							mysql
									.fetchData(
											function(err, results) {
												if (err) {
													throw err;
												} else {
													if (results.length > 0) {
														var grpId = results[0].Id;
														var newContactData = {
															fname : Fname,
															lname : Lname,
															email : Email,
															groupId : grpId,
															isRead : 0
														};
														mysql
																.insertData(
																		function(
																				err,
																				results) {
																			if (err) {
																				throw err;
																			} else {
																				console
																						.log("new contact registered.");
																				resdata = {
																					errorCode : 100,
																					message : "All your contacts from the file have been recorded."
																				};
																				responseString = JSON
																						.stringify(data);
																				res
																						.send(responseString);
																			}

																		},
																		newContactData,
																		"contacts");
													} else {
														resdata = {
															errorCode : 101,
															message : "Please create the specified group from the file first."
														};
														responseString = JSON
																.stringify(data);
														res
																.send(responseString);
													}

												}
											}, getQ);

						}
					}).on("end", function() {
				console.log("done");
			});

};

exports.createGroup = function(req, res) {
	var data;
	var responseString;
	var Gname = req.param("group_name");
	if (Gname == null || typeof (Gname) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Group name requried for creating a group."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var userObj = req.session.user;
	var owned = userObj.id;
	var newGroupData = {
		groupName : Gname,
		ownerId : owned
	};
	mysql.insertData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("new group registered.");
			data = {
				errorCode : 100,
				message : "The contact was saved successfully"
			};
			responseString = JSON.stringify(data);
			res.send(responseString);
		}

	}, newGroupData, "contacts");

}

exports.deleteContact = function(req, res) {
	var Cid = req.param("contact-id");
	var data;
	var responseString;
	if (Cid == null || typeof (Cid) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please select contact to delete."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var deleteQuery = "Delete from contacts where id=" + Cid;
		mysql
				.fetchData(
						function(err, results) {
							if (err) {
								data = {
									errorCode : 101,
									message : "Error occured on the server side.Please try again."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {

								data = {
									errorCode : 100,
									message : "Contact deleted succesfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, deleteQuery);

	}
};

exports.deleteContactGroup = function(req, res) {
	var Cid = req.param("contact-id");
	var data;
	var responseString;
	if (Cid == null || typeof (Cid) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please select contact to delete."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var deleteQuery = "Delete from contacts where id=" + Cid;
		mysql
				.fetchData(
						function(err, results) {
							if (err) {
								data = {
									errorCode : 101,
									message : "Error occured on the server side.Please try again."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {

								data = {
									errorCode : 100,
									message : "Contact deleted succesfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, deleteQuery);

	}
};

exports.editContact = function(req, res) {
	var Cid = req.param("contact-id");
	var fname = req.param("first-name");
	var lname = req.param("last-name");
	var email = req.param("email");
	var group = req.param("group-id");
	var data;
	var responseString;
	if (Cid == null || typeof (Cid) == "undefined" || email == null
			|| typeof (email) == "undefined" || group == null
			|| typeof (group) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please enter all the required fields."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var updateQuery = "Update contacts Set fname='" + fname + "' , lname='"
				+ lname + "', email='" + email + "' , groupId=" + group
				+ " where id=" + Cid;
		mysql
				.fetchData(
						function(err, results) {

							if (err) {
								data = {
									errorCode : 101,
									message : "Error occured on the server side.Please try again."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {

								console.log("Category updated.");
								data = {
									errorCode : 100,
									message : "Your changes were saved successfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, updateQuery);

	}

};

exports.editContactGroup = function(req, res) {

	var gname = req.param("group-name");
	var group = req.param("group-id");
	var data;
	var responseString;
	if (gname == null || typeof (gname) == "undefined" || group == null
			|| typeof (group) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please enter all the required fields."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var updateQuery = "Update contactgroup Set groupName='" + gname
				+ "' where id=" + group;
		mysql
				.fetchData(
						function(err, results) {

							if (err) {
								data = {
									errorCode : 101,
									message : "Error occured on the server side.Please try again."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							} else {

								console.log("Category updated.");
								data = {
									errorCode : 100,
									message : "Your changes were saved successfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, updateQuery);

	}
};

exports.renderTest = function(req, res) {
	ejs.renderFile('./views/test.ejs', function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});

};
