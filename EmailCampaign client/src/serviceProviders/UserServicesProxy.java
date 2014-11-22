package serviceProviders;

public class UserServicesProxy implements serviceProviders.UserServices {
  private String _endpoint = null;
  private serviceProviders.UserServices userServices = null;
  
  public UserServicesProxy() {
    _initUserServicesProxy();
  }
  
  public UserServicesProxy(String endpoint) {
    _endpoint = endpoint;
    _initUserServicesProxy();
  }
  
  private void _initUserServicesProxy() {
    try {
      userServices = (new serviceProviders.UserServicesServiceLocator()).getUserServices();
      if (userServices != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)userServices)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)userServices)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (userServices != null)
      ((javax.xml.rpc.Stub)userServices)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public serviceProviders.UserServices getUserServices() {
    if (userServices == null)
      _initUserServicesProxy();
    return userServices;
  }
  
  public void initializeConnectionPool() throws java.rmi.RemoteException{
    if (userServices == null)
      _initUserServicesProxy();
    userServices.initializeConnectionPool();
  }
  
  public vo.UserVo login(java.lang.String username, java.lang.String password) throws java.rmi.RemoteException{
    if (userServices == null)
      _initUserServicesProxy();
    return userServices.login(username, password);
  }
  
  public vo.RequestResult signUp(vo.UserVo newUser) throws java.rmi.RemoteException{
    if (userServices == null)
      _initUserServicesProxy();
    return userServices.signUp(newUser);
  }
  
  
}