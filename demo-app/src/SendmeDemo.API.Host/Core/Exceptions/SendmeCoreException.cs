using Securrency.LiquidityEngine.API.Host.ExceptionHandling;

namespace SendmeDemo.Core.Exceptions;

public class SendmeCoreException : Exception
{
    public SendmeCoreException(string message) : base(message)
    { }
    
    public virtual ErrorType ErrorType => ErrorType.ClientError;
}