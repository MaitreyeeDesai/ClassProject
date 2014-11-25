/**
 * New node file
 */

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service : 'gmail',
	auth : {
		user : 'maitreyeesunildesai@gmail.com',
		pass : 'msuniapplications'
	}
});

exports.sendEmail = function(htmlTemplate, addressTo, addressFrom, subject) {
	var data;
	var responseString;
	
	var mailOptions = {
		from : addressFrom, // sender address
		to : addressTo, // list of receivers separated by commas
		subject : subject, // Subject line
		html : htmlTemplate

	};
	transporter.sendMail(mailOptions, function(error, info) {
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