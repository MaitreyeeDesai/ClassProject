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
	var mailOptions = {
		from : addressFrom, // sender address
		to : addressTo, // list of receivers separated by commas
		subject : subject, // Subject line
		html : htmlTemplate

	};
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});
};