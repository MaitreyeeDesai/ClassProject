package databaseInteractions;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import applicationUtil.AppUtil;
import connection.*;
import vo.*;

public class User {

	public UserVo login(String username, String password) {
		UserVo loggedUser = new UserVo();
		System.out.println("Inside operation");
		try {
			if (username == "" || username == null || password == ""
					|| password == null) {
				return null;
			}
			String query = "select *from user where username='" + username
					+ "' and password='" + password + "'";
			System.out.println("Query made");
			Statement st = new DatabaseConnection().getDatabaseConnection();
			System.out.println("Connection obtained");
			ResultSet res = st.executeQuery(query);
			System.out.println("Statement executed");
			while (res.next()) {
				loggedUser.setFirstName(res.getString("fname"));
				loggedUser.setLastName(res.getString("lname"));
				loggedUser.setUserName(res.getString("username"));
				loggedUser.setPassword(res.getString("password"));
				loggedUser.setId(res.getInt("id"));
				DateFormat format=new SimpleDateFormat("MM/dd/yyyy HH:mm:");
				loggedUser.setLastLogin(format.format(res.getDate("lastlogin")));
				System.out.println("Date set");
				updateLastLogin(loggedUser.getId());
				System.out.println("User login date updated");
			}
			res.close();
			new DatabaseConnection().releaseDatabaseConnection(st.getConnection());
			System.out.println("Connection released");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		return loggedUser;
	}

	public RequestResult registerNewUser(UserVo newUser) {
		RequestResult result = new RequestResult();
		try {
			if (newUser.getFirstName() == "" || newUser.getFirstName() == null) {
				result.setErrorCode(Constants.REQUIRED_FIELD_MISSING);
				result.setMessage("Please enter your first name.");
				return result;
			}
			if (newUser.getLastName() == "" || newUser.getLastName() == null) {
				result.setErrorCode(Constants.REQUIRED_FIELD_MISSING);
				result.setMessage("Please enter your last name.");
				return result;
			}
			if (newUser.getUserName() == "" || newUser.getUserName() == null) {
				result.setErrorCode(Constants.REQUIRED_FIELD_MISSING);
				result.setMessage("Please choose a username for your account");
				return result;
			}
			if (newUser.getPassword() == "" || newUser.getPassword() == null) {
				result.setErrorCode(Constants.REQUIRED_FIELD_MISSING);
				result.setMessage("Please choose a password for your account");
				return result;
			}
			DatabaseConnection obj=new DatabaseConnection();
			Statement st = obj.getDatabaseConnection();
			System.out.println(newUser.getUserName());
			String checkQuery="Select *from user where username='"+ newUser.getUserName()+"'";
			ResultSet r= st.executeQuery(checkQuery);
			if (r.next()==true) {
				System.out.println(r.wasNull()+newUser.getUserName());
				result.setErrorCode(Constants.DUPLICATE_USERNAME_ERROR);
				result.setMessage("Please select a unique username.This is already in use.");
			} else {
				// insert the entry
				java.sql.Date currentDate= AppUtil.getTodaysDate();
				String query = "Insert into user (fname,lname,username,password,lastlogin)VALUES('"
						+ newUser.getFirstName()
						+ "','"
						+ newUser.getLastName()
						+ "','"
						+ newUser.getUserName()
						+ "','"
						+ newUser.getPassword()
						+ "','" + currentDate + "')";
				
				int rowCount = st.executeUpdate(query);

				if (rowCount > 0) {
					result.setErrorCode(Constants.OPERATION_SUCCESSFUL);
					result.setMessage("Business registered successfully.");
				} else {
					result.setErrorCode(Constants.OPERATION_FAILURE);
					result.setMessage("Some error occured during registration. Please try again.");
				}
			}
			obj.releaseDatabaseConnection(st.getConnection());
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result.setErrorCode(Constants.OPERATION_FAILURE);
			result.setMessage(e.getMessage());
		}
		return result;
	}
	
	public void updateLastLogin(int userId)
	{
		try {
			if(userId==0)
			{
				return;
			}
			java.sql.Date currentDate= AppUtil.getTodaysDate();
			System.out.println(currentDate);
			
			String query="Update user SET lastlogin='" +currentDate
					+ "' where id='" + userId + "'";
			DatabaseConnection obj=new DatabaseConnection();
			Statement st = obj.getDatabaseConnection();
			st.executeUpdate(query);
			obj.releaseDatabaseConnection(st.getConnection());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
	}
	
	

}
