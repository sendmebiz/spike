using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

[Function("setLimit", "string")]
public class SetLimitFunction : FunctionMessage
{
    [Parameter("uint256", "_limit", 1)] public BigInteger Limit { get; set; }
}