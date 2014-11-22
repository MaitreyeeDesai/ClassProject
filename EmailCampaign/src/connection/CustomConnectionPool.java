package connection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CustomConnectionPool {

	private static List<Connection> connectionPool = new ArrayList<Connection>();
	private static boolean isPoolInitialized=false;
	
	public void initializaConnectionPool() {
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			for (int count = 0; count < 10; count++) {
				Connection con = DriverManager.getConnection(
						"jdbc:mysql://localhost:3306/emailcampaign", "root", "Welcome1");
				connectionPool.add(con);
				System.out.println(connectionPool.size());
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		isPoolInitialized=true;
	}

	public boolean isConnectionAvailable() {
		if (connectionPool.size() > 0) {
			return true;
		}
		return false;
	}

	public Connection getConnection()
	{
		System.out.println(isConnectionAvailable());
		if (isConnectionAvailable()) {
			System.out.println(connectionPool.size());
			int count=connectionPool.size()-1;
			Connection con = connectionPool.remove(count);
			return con;
		}
		return null;
	}

	public void releaseConnection(Connection con) {
		if (con != null) {
			connectionPool.add(con);
		}

	}
	
	public boolean checkIfPoolInitialized()
	{
		if(isPoolInitialized)
		{
			return true;
		}
		return false;
	}
}
