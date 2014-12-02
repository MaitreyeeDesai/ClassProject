/**
 * New node file
 */
// [TODO: Create, edit delete email templates]
// reference database table: emails
var ejs = require("ejs");
var mysql = require('./mysql');
var nodemailer = require('nodemailer');

exports.saveEmailForUser = function(req, res) {
	var responseString;
	var data;
	var userObject = req.session.user;
	var ownedId = userObject.Id;
	// get the params: bid,review,rating
	var email = req.param("emailContent");
	if (email == null || typeof (email) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Please select an email template to design your email."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var subjectL = req.param("subject");
	if (subjectL == null || typeof (subjectL) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Please enter a subject line to design your email."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var newEmailData = {
		ownerId : ownedId,
		emailString : email,
		subjectLine:subjectL

	};
	mysql
			.insertData(
					function(err, results) {
						if (err) {
							console.log("error while saving email.");
							data = {
								errorCode : 101,
								message : "There was some error while saving your email please try again."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						} else {
							console.log("email saved.");
							data = {
								errorCode : 100,
								message : "Your email has been recorded."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						}

					}, newEmailData, "emails");

};

exports.deleteEmail = function(req, res) {

	var Eid = req.param("email-id");
	var data;
	var responseString;
	if (Eid == null || typeof (Eid) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please select an email to delete."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var deleteQuery = "Delete from emails where id=" + Eid;
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
									message : "Email deleted succesfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, deleteQuery);

	}
};

exports.editEmail = function(req, res) {
	var Eid = req.param("Email-id");
	var Email = req.param("Email");
	var data;
	var responseString;
	if (Eid == null || typeof (Eid) == "undefined" || Email == null
			|| typeof (Email) == "undefined") {
		data = {
			errorCode : 101,
			message : "Please select a valid email template."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	} else {
		var updateQuery = "Update emails Set emailString='" + Email
				+ "' where id=" + Eid;
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
									message : "The email template changes were saved successfully."
								};
								responseString = JSON.stringify(data);
								res.send(responseString);
							}
						}, updateQuery);

	}
};

exports.sendEmail = function(req, res) {
	var data;
	var responseString;
	var subject = req.param("subject");
	if (subject == null || typeof (subject) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Please give a subject to your email for increasing the open rate."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var addressTo = req.param("address-to");
	if (addressTo == null || typeof (addressTo) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Please enter the group of people you wish to send the email to."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var email = req.param("emailContent");
	if (email == null || typeof (email) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Please select an email template for your email."
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var userObject = req.session.user;
	var senderEmail = userObject.username;
	var transporter = nodemailer.createTransport({
		service : 'gmail',
		auth : {
			user : 'maitreyeesunildesai@gmail.com',
			pass : 'msuniapplications'
		}
	});
	var mailOptions = {
		from : senderEmail, // sender address
		to : addressTo, // list of receivers separated by commas
		subject : subject, // Subject line
		html : email

	};
	transporter
			.sendMail(
					mailOptions,
					function(error, info) {
						if (error) {
							console.log(error);
							data = {
								errorCode : 101,
								message : "An error occured while sending the email. Please try again."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						} else {
							console.log('Message sent: ' + info.response);
							data = {
								errorCode : 100,
								message : "The email was sent successfully."
							};
							responseString = JSON.stringify(data);
							res.send(responseString);
						}
					});

};

function checkSubjectEffectivity(subjectLine, keywords) {
	var keywordArray = keywords.split(",");
	var count = 0;
	for (var counter = 0; counter < keywordArray.length; counter++) {
		var word = keywordArray[counter];
		if (subjectLine.indexOf(word) > -1) {
			count = count + 1;
		}
	}
	var percent=(count/keywordArray.length)*100;
	return percent;
}

exports.checkEmailSubjectLine = function(req, res) {
	var industryID = req.param("industry-id");
	var subject = req.param("subject");
	var responseString;
	var getQuery = "Select *from industries where Id=" + industryID;
	mysql.fetchData(function(err, results) {

		if (err) {
			throw err;
		} else {
			var reqObj = results[0];
			var percentEffectivity= checkSubjectEffectivity(subject,reqObj.keywords);
			responseString = JSON.stringify(percentEffectivity);
			res.send(responseString);
		}
	}, getQuery);

};

