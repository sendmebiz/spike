namespace SendmeDemo.Configuration;

public enum ErrorType
{
    ClientError,
    ServerError,
    ResourceNotFound, 
    AuthenticationRequired,
    ResourceAlreadyExists,
    AccessForbidden,
    FailedDependency,
    NotAllowed
}