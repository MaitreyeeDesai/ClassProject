/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('Landing', {
		title : 'Email campaign'
	});
};

exports.getSignupPage = function(req, res) {
	res.render('Sign-Up', {
		title : 'Email campaign'
	});
};

exports.getHome = function(req, res) {
	res.render('Home', {
		title : 'Email campaign'
	});
};
exports.getAboutUs = function(req, res) {
	res.render('About-us', {
		title : 'Email campaign'
	});
};
exports.getFeatures = function(req, res) {
	res.render('Features', {
		title : 'Email campaign'
	});
};

exports.getContacts = function(req, res) {
	res.render('contacts', {
		title : 'Email campaign'
	});
};

exports.getEmailsPage = function(req, res) {
	res.render('emails', {
		title : 'Email campaign'
	});
};
