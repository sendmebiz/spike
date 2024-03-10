using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace SendmeDemo.Contracts.Functions;

[Function("getPolicyState", "string")]
public class PolicyStateFunction : FunctionMessage
{
    
}