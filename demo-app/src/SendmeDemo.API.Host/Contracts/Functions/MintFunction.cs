using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

[Function("mint", "string")]
public class MintFunction : FunctionMessage
{
    [Parameter("address", "_to", 1)] public string To { get; set; }

    [Parameter("uint256", "_value", 2)] public BigInteger Value { get; set; }
}

[Function("mint", "string")]
public class MintNFTFunction : FunctionMessage
{
    [Parameter("address", "_to", 1)] public string To { get; set; }
}