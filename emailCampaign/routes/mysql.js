var ejs = require('ejs');
var mysql = require('mysql');
var pool;

exports.initializeDatabaseConnectionPool = function() {
	pool = mysql.createPool({
		host : 'emailcampaign.cafwmc855han.us-west-2.rds.amazonaws.com',
		user : 'root',
		password : 'Welcome1',
		database : 'emailcampaign'
	});

};

function getConnection(callback) {
	pool.getConnection(function(err, connection) {
		callback(err, connection);
	});
}

function fetchData(callback, sqlQuery) {

	getConnection(function(err, connection) {
		// console.log(connection);
		connection.query(sqlQuery, function(err, rows, fields) {
			if (err) {
				console.log("ERROR: " + err.message);
			} else {
				callback(err, rows);
			}
		});
		connection.release();
		// customPool.releaseConnection(connection);
	});

}

function insertData(callBack, data, table) {
	getConnection(function(err, connection) {
		connection.query('INSERT INTO ' + table + ' SET ?', data, function(err,
				rows, fields) {
			// Neat!
			if (err) {
				console.log("ERROR: " + err.message);
			} else { // return err or result
				callBack(err, rows);
			}
		});
		connection.release();

	});

}

exports.fetchData = fetchData;
exports.insertData = insertData;