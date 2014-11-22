/**
 * UserServices.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package serviceProviders;

public interface UserServices extends java.rmi.Remote {
    public void initializeConnectionPool() throws java.rmi.RemoteException;
    public vo.UserVo login(java.lang.String username, java.lang.String password) throws java.rmi.RemoteException;
    public vo.RequestResult signUp(vo.UserVo newUser) throws java.rmi.RemoteException;
}
