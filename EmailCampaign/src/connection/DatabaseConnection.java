package connection;

import java.sql.*;


public class DatabaseConnection {

	
	public Statement getDatabaseConnection()
	{
		Connection con = null;
		Statement stmt = null;
		try {			
			
			//con = DriverManager.getConnection("jdbc:mysql://localhost:3306/emailcampaign","root","Welcome1");
			con= new CustomConnectionPool().getConnection();
			System.out.println(con);
			stmt = con.createStatement();
			if(!con.isClosed())
				System.out.println("Successfully Connected!!!");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return stmt;
	}
	
	public void releaseDatabaseConnection(Connection con)
	{
		try {
			CustomConnectionPool pool=new CustomConnectionPool();
			pool.releaseConnection(con);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
