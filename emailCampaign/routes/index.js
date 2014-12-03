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

		var owned = user.id;
		console.log(owned);
		var getQuery = "select *from contactgroup where ownerId=" + owned;
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				if (typeof (results) == "undefined") {
					results = new Array();

				}
				user.contactList = results;
				ejs.renderFile('./views/contacts.ejs', user, function(err,
						result) {
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
		}, getQuery);

	}

};

exports.getEmailsPage = function(req, res) {

	var user = req.session.user;
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		var getInd="Select *from industries";
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				
				user.industries= results;
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
		}, getInd);
		
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
	var user = req.session.user;
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		ejs.renderFile('./views/templates.ejs', user, function(err, result) {
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

exports.getListOverView = function(req, res) {

	var listName = req.param("list");
	var user = req.session.user;
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		var owned = user.id;
		var getQuery = "select *from contactgroup where ownerId=" + owned
				+ " and groupName='" + listName + "'";
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				var list = results[0];
				var listId = list.id;
				var getContact = "select *from contacts where groupId="	+ listId;
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						if(typeof(results)=="undefined")
							{
								results=new Array();
							}
						user.list=results;
						user.currentList=listName;
						ejs.renderFile('./views/ListOverView.ejs', user, function(err, result) {
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
				}, getContact);

			}
		}, getQuery);

	}

	
};



exports.AddContacts = function(req, res) {
	var user = req.session.user;
	var list=req.param("list");
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		user.listID=list;
		ejs.renderFile('./views/AddContacts.ejs', user, function(err, result) {
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

exports.getClassicTemplate=function(req,res)
{
	var user = req.session.user;
	var list=req.param("list");
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		user.listID=list;
		ejs.renderFile('./views/classic-template.ejs', user, function(err, result) {
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

exports.getPersonalTemplate=function(req,res)
{
	var user = req.session.user;
	var list=req.param("list");
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		user.listID=list;
		ejs.renderFile('./views/personal-template.ejs', user, function(err, result) {
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


exports.getProfessionalTemplate=function(req,res)
{
	var user = req.session.user;
	var list=req.param("list");
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		user.listID=list;
		ejs.renderFile('./views/professional-template.ejs', user, function(err, result) {
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

exports.getCreateEmailPage=function(req,res)
{
	var user = req.session.user;
	var industry=req.param("industry");
	if (typeof (user) == "undefined") {
		res.redirect("/");
	} else {
		
		var getQuery = "select *from contactgroup where ownerId=" + user.id;
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				if (typeof (results) == "undefined") {
					results = new Array();

				}
				user.contactList = results;
				user.industry=1;
				ejs.renderFile('./views/CreateEmail.ejs', user, function(err, result) {
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
		}, getQuery);
		
	}
};