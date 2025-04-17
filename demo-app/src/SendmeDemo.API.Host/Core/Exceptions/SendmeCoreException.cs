using SendmeDemo.Configuration;

namespace SendmeDemo.Core.Exceptions;

public class SendmeCoreException : Exception
{
    public SendmeCoreException(string message) : base(message)
    { }
    
    public virtual ErrorType ErrorType => ErrorType.ClientError;
}