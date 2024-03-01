using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

[Function("setPeriod", "string")]
public class SetPeriodFunction : FunctionMessage
{
    [Parameter("uint256", "_period", 1)] public BigInteger Period { get; set; }
}