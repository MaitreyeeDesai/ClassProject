var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');
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
	var user = req.session.user;
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {

		ejs.renderFile('./views/Home.ejs', user, function(err, result) {
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
	}

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
	var user = req.session.user;
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {

		ejs.renderFile('./views/contacts.ejs', user, function(err, result) {
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
	}

	
};

exports.getEmailsPage = function(req, res) {
	
	var user = req.session.user;
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {

		ejs.renderFile('./views/emails.ejs', user, function(err, result) {
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
	}
	
};

exports.getIndexPage = function(req, res) {
	res.render('index', {
		title : 'Email campaign'
	});
};

exports.getSignInPage = function(req, res) {
	res.render('signin', {
		title : 'Email campaign'
	});
};
exports.getCreateListView = function(req, res) {
	res.render('CreateList', {
		title : 'Email campaign'
	});
};

exports.getTemplateView = function(req, res) {
	res.render('templates', {
		title : 'Email campaign'
	});
};


exports.getListOverView = function(req, res) {
	res.render('ListOverView', {
		title : 'Email campaign'
	});
};