var ejs = require("ejs");
var mysql = require('./mysql');
var common = require('./common');
/*
 * GET users listing.
 */

exports.login = function(req, res) {
	if (typeof (req.param("password")) === "undefined"
			|| typeof (req.param("username")) === "undefined") {
		ejs.renderFile('./views/invalidLogin.ejs', function(err, result) {
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
	var getUser = "select * from user where username='" + req.param("username")
			+ "'" + " and password='" + req.param("password") + "'";

	// check using the database operations if it is correct
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				console.log("valid Login");
				var loggedInUser = results[0];
				// on login success update the last login time as current time
				updateCurrentDateInLoggedInUser(req.param("username"));
				loggedInUser.lastlogin = common.FormatDate(
						loggedInUser.lastLogin, "%Y-%m-%d %H:%M:%S", false);
				// set the session object
				req.session.user = loggedInUser;
				// render the home page
				// [TODO: Kirthi and sindhura: you will render the home page
				// here using ejs.renderfile]

			} else {

				console.log("Invalid Login");
				var message = "Invalid username or password";
				// [TODO: Kirthi and sindhura:
				// return the invalid login page: just write the path of the ejs
				// file in empty string below]
				ejs.renderFile('', message, function(err, result) {
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
		}
	}, getUser);

}

exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect("/")

}

exports.register = function(req, res) {
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
	var Password = req.param("password");
	if (Password == null || typeof (Password) == 'undefined') {
		data = {
			errorCode : 101,
			message : "Password requried for sucessful registration"
		};
		responseString = JSON.stringify(data);
		res.send(responseString);
	}
	var todaysDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", true);
	var newUserData = {
		fname : Fname,
		lname : Lname,
		username : Email,
		password : Password,
		lastlogin : todaysDate
	};
	mysql.insertData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("new user registered.")
			res.redirect("/");
		}

	}, newUserData, "user");

};

exports.updateCurrentDateInLoggedInUser = function(username) {
	var currentDate = common.FormatDate(new Date(), "%Y-%m-%d %H:%M:%S", false);
	var updateTime = "Update user SET lastlogin='" + currentDate
			+ "' where username='" + username + "'";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("last login time updated for the user.")
		}

	}, updateTime);
}