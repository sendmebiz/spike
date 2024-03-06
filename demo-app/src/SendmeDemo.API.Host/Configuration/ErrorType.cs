namespace Securrency.LiquidityEngine.API.Host.ExceptionHandling;

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