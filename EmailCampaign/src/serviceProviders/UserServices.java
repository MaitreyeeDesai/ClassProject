package serviceProviders;

import javax.jws.WebService;

import connection.CustomConnectionPool;
import vo.*;
import databaseInteractions.*;

@WebService
public class UserServices {

	public UserVo login(String username, String password) {
		if (username == "" || password == "" || password == null
				|| username == null) {
			return null;
		}
		UserVo loggedInUser = new User().login(username, password);

		return loggedInUser;
	}

	public RequestResult signUp(UserVo newUser) {
		RequestResult result = new RequestResult();
		if (newUser == null) {
			result.setErrorCode(Constants.OPERATION_FAILURE);
			result.setMessage("User details not received.");
			return result;
		}
		result = new User().registerNewUser(newUser);
		return result;
	}

	

	public void initializeConnectionPool() {
		CustomConnectionPool con = new CustomConnectionPool();
		if (!con.checkIfPoolInitialized()) {
			con.initializaConnectionPool();
		}

	}

}
